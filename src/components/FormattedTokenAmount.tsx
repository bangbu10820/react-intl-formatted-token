import Decimal from "decimal.js";
import React, { FC, useMemo } from "react";
import { FormattedNumber, useIntl, FormatNumberOptions } from "react-intl";
import { CurrencyWrapper } from "../core/CurrencyWrapper";

interface FormattedTokenAmountProps
	extends Pick<
		FormatNumberOptions,
		"notation" | "style" | "currency" | "currencyDisplay"
	> {
	value: number | string | bigint;
	as?: React.ElementType;
	style?: "currency" | "decimal";
}

export const FormattedTokenAmount: FC<FormattedTokenAmountProps> = ({
	value: rawValue,
	as,
	notation,
	currency,
	currencyDisplay,
	style = "decimal",
}) => {
	const intl = useIntl();
	const Text = as || intl.textComponent || React.Fragment;

	const withCurrency = (children: React.ReactNode) =>
		style === "currency" ? (
			<CurrencyWrapper currency={currency} currencyDisplay={currencyDisplay}>
				{children}
			</CurrencyWrapper>
		) : (
			children
		);

	const value = useMemo(() => {
		if (typeof rawValue === "bigint") {
			return new Decimal(rawValue.toString());
		} else {
			return new Decimal(rawValue);
		}
	}, [rawValue]);

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
			return <Text>{rawValue}</Text>;
		}

		const [_, decimalPoint, zeros, significantDigits] = match;
		const formattedZeros = `${zeros?.length}`;
		const formattedSignificant = significantDigits?.slice(0, 4);

		return (
			<Text>
				{withCurrency(
					<>
						<FormattedNumber
							value={0}
							style="decimal"
							roundingMode="trunc"
							minimumFractionDigits={1}
							maximumFractionDigits={1}
						/>
						<sub style={{ fontSize: "smaller" }}>{formattedZeros}</sub>
						<>{formattedSignificant}</>
					</>,
				)}
			</Text>
		);
	}

	return (
		<FormattedNumber
			value={value.toNumber()}
			style={style}
			roundingMode="trunc"
			maximumFractionDigits={maximumFractionDigits}
			notation={notation}
			currency={currency}
			currencyDisplay={currencyDisplay}
		/>
	);
};

FormattedTokenAmount.displayName = "FormattedTokenAmount";
