import { NumberFormatOptions } from "@formatjs/ecma402-abstract";
import Decimal from "decimal.js";
import React, { FC } from "react";
import { FormattedNumber } from "react-intl";

interface FormattedTokenAmountProps {
	value: number;
	subStyle?: React.CSSProperties;
	as?: React.ElementType;
	notation?: NumberFormatOptions["notation"];
}

export const FormattedTokenAmount: FC<FormattedTokenAmountProps> = ({
	value: rawValue,
	subStyle,
	as = "span",
	notation,
}) => {
	const Component = as;
	const value = new Decimal(rawValue);

	if (value.lt(new Decimal("0.000001"))) {
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
				<Component style={{ fontSize: 8, ...subStyle }}>
					{formattedZeros}
				</Component>
				<Component>{formattedSignificant}</Component>
			</Component>
		);
	}

	if (value.lt(new Decimal("0.001"))) {
		return (
			<FormattedNumber
				value={value.toNumber()}
				style="decimal"
				roundingMode="trunc"
				maximumFractionDigits={6}
				notation={notation}
			/>
		);
	}

	// If value > 0.001, show 4 decimal places
	return (
		<FormattedNumber
			value={value.toNumber()}
			style="decimal"
			roundingMode="trunc"
			maximumFractionDigits={4}
			notation={notation}
		/>
	);
};
