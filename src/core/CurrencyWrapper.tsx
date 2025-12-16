import React, { FC, useMemo } from "react";
import { useIntl, FormatNumberOptions } from "react-intl";

interface CurrencyWrapperProps
	extends Pick<FormatNumberOptions, "currency" | "currencyDisplay"> {
	children: React.ReactNode;
}

export const CurrencyWrapper: FC<CurrencyWrapperProps> = ({
	children,
	currency,
	currencyDisplay,
}) => {
	const intl = useIntl();

	// Get currency symbol by formatting a sample number using current locale
	const currencySetting = useMemo(() => {
		const sampleFormatted = intl.formatNumber(0, {
			style: "currency",
			currency: currency,
			currencyDisplay: currencyDisplay,
			maximumSignificantDigits: 1,
			maximumFractionDigits: 0,
		});
		// Only remove numbers, commas, and decimal points, keep spaces
		const symbol = sampleFormatted.replace(/[\d,.]/g, "");
		const isSymbolAtStart = sampleFormatted.indexOf(symbol) === 0;

		return {
			symbol,
			isSymbolAtStart,
		};
	}, [currency, currencyDisplay, intl]);

	return (
		<>
			{currencySetting?.isSymbolAtStart && <>{currencySetting?.symbol}</>}
			{children}
			{!currencySetting?.isSymbolAtStart && <>{currencySetting?.symbol}</>}
		</>
	);
};
