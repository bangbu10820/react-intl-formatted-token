import { NumberFormatOptions } from "@formatjs/ecma402-abstract";
import Decimal from "decimal.js";
import React, { FC, useMemo } from "react";
import { FormattedNumber } from "react-intl";

interface FormattedTokenAmountProps {
	value: number;
	as?: React.ElementType;
	notation?: NumberFormatOptions["notation"];
}

export const FormattedTokenAmount: FC<FormattedTokenAmountProps> = ({
	value: rawValue,
	as = "span",
	notation,
}) => {
	const Component = as;
	const value = useMemo(() => new Decimal(rawValue), [rawValue]);

	const maximumFractionDigits = useMemo(() => {
		if (value.lt(new Decimal("0.0001"))) return 8;
		if (value.lt(new Decimal("0.001"))) return 6;
		if (value.lt(new Decimal("0.01"))) return 4;
		return 3;
	}, [value]);

	// Special formatting for very small values (< 0.00001)
	if (value.lt(new Decimal("0.00001"))) {
		const toFixedString = value.toFixed();
		const match = toFixedString.match(/^(0\.)([0]*)([1-9]\d*)$/);

		if (!match) {
			return <Component>{rawValue}</Component>;
		}

		const [_, decimalPoint, zeros, significantDigits] = match;
		const formattedZeros = `${zeros?.length}`;
		const formattedSignificant = significantDigits?.slice(0, 4);

		return (
			<Component>
				<FormattedNumber
					value={0}
					style="decimal"
					roundingMode="trunc"
					minimumFractionDigits={1}
					notation={notation}
				/>
				<sub style={{ fontSize: "smaller" }}>{formattedZeros}</sub>
				<span>{formattedSignificant}</span>
			</Component>
		);
	}

	return (
		<FormattedNumber
			value={value.toNumber()}
			style="decimal"
			roundingMode="trunc"
			maximumFractionDigits={maximumFractionDigits}
			notation={notation}
		/>
	);
};
