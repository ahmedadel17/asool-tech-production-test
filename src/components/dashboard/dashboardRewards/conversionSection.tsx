import React from 'react'
import { useTranslations } from 'next-intl'
interface ConversionTier {
  points: number;
  bonus: number;
  value: number;
  label: string;
  highlight?: boolean;
}
function ConversionSection({conversion_tiers, current_points, selectedTier, handleSelectTier, pointsToConvert, resultAmount, handleCustomChange}: {conversion_tiers: ConversionTier[], current_points: number, selectedTier: number | null, handleSelectTier: (tier: ConversionTier, index: number) => void, pointsToConvert: number, resultAmount: number, handleCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  const t = useTranslations();
  return (
    <div
    id="conversion-section"
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700 p-6"
  >
    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
      {t("Convert Points to Wallet Balance")}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {conversion_tiers.map((tier, i) => {
        const unavailable = tier.points > current_points;
        return (
          <div
            key={i}
            onClick={() => handleSelectTier(tier, i)}
            className={`border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
              selectedTier === i
                ? "ring-2 ring-primary-500"
                : tier.highlight
                ? "border-primary-500 bg-primary-50/20"
                : "border-gray-200 hover:border-primary-300"
            } ${unavailable ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {tier.points} {t("Points")}
              </h3>
              {tier.highlight && (
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {tier.label}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {tier.value.toFixed(2)} SAR
            </div>
            {tier.bonus > 0 && (
              <div className="text-sm text-green-600 font-medium">
                +{tier.bonus}% {t("Bonus")}!
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {unavailable
                ? `${t('Need')} ${tier.points - current_points} ${t("more points")}`
                : `${t('Available')}`}
            </div>
          </div>
        );
      })}
    </div>

    {/* Custom Conversion */}
    <div className=" border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
      <h3 className="font-medium text-gray-900 dark:text-white mb-4">
        {t("Custom Amount")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="points"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            {t("Points to Convert")}
          </label>
          <input
            type="number"
            id="points"
            min={100}
            max={current_points}
            step={10}
            value={pointsToConvert || ""}
            onChange={handleCustomChange}
            className="w-full rounded-md border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:text-white px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t("You will receive")}
          </label>
          <div className="block w-full rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
            {resultAmount.toFixed(2)} {t("SAR")}
          </div>
        </div>
      </div>
      <button
        disabled={pointsToConvert < 100 || pointsToConvert > current_points}
        className="bg-primary-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {t("Convert Points")}
      </button>
    </div>
  </div>    
  )
}

export default ConversionSection