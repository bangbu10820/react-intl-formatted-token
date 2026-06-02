import Decimal from "decimal.js";
import React, { FC } from "react";
import { FormattedNumber, useIntl, FormatNumberOptions } from "react-intl";

interface FormattedSmallNumberProps {
	value: Decimal;
}

export const FormattedSmallNumber: FC<FormattedSmallNumberProps> = ({
	value,
}) => {
	// Special formatting for very small values (< 0.00001)
	if (value.lt(new Decimal("0.00001"))) {
		const toFixedString = value.toFixed();
		const match = toFixedString.match(/^(0\.)([0]*)([1-9]\d*)$/);

		if (!match) {
			return <>{value.toString()}</>;
		}

		const [_, decimalPoint, zeros, significantDigits] = match;
		const formattedZeros = `${zeros?.length}`;
		const formattedSignificant = significantDigits?.slice(0, 4);

		return (
			<>
				<FormattedNumber
					value={0}
					style="decimal"
					roundingMode="trunc"
					minimumFractionDigits={1}
					maximumFractionDigits={1}
				/>
				<sub style={{ fontSize: "smaller" }}>{formattedZeros}</sub>
				<span>{formattedSignificant}</span>
			</>
		);
	}
	return null;
};
