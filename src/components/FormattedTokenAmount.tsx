import { NumberFormatOptions } from "@formatjs/ecma402-abstract";
import Decimal from "decimal.js";
import React, { FC } from "react";
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
	const value = new Decimal(rawValue);

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

	if (value.lt(new Decimal("0.0001"))) {
		return (
			<FormattedNumber
				value={value.toNumber()}
				style="decimal"
				roundingMode="trunc"
				maximumFractionDigits={8}
				notation={notation}
			/>
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

	if (value.lt(new Decimal("0.01"))) {
		return (
			<FormattedNumber
				value={value.toNumber()}
				style="decimal"
				roundingMode="trunc"
				maximumFractionDigits={4}
				notation={notation}
			/>
		);
	}

	// If value > 0.01, show 3 decimal places
	return (
		<FormattedNumber
			value={value.toNumber()}
			style="decimal"
			roundingMode="trunc"
			maximumFractionDigits={3}
			notation={notation}
		/>
	);
};
