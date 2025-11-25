import { useTranslations } from 'next-intl';
import React from 'react'

function LoyaltyProgress({current_tier, next_tier, points_to_next_tier, percentage}: {current_tier: string, next_tier: string, points_to_next_tier: number, percentage: number}) {
  const t = useTranslations();
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {t("Loyalty Progress")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("You are currently a")} {" "}
                <span className="font-bold text-gray-500 dark:text-gray-300">
                  {current_tier}
                </span>{" "}
                {t("member")}. {t("Only")}{" "}
                <span className="font-bold text-yellow-500">
                    {points_to_next_tier} {t("points")}
                </span>{" "}
                {t("away from")}{" "}
                <span className="font-bold text-yellow-500">{next_tier}</span>!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{percentage}%</div>
              <div className="text-xs text-gray-500">{t("Complete")}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
            <div
              className="bg-gradient-to-r from-primary-500 to-yellow-500 h-3 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{current_tier} {t("Current")}</span>
            <span>
              {next_tier} (+{points_to_next_tier} {t("pts")})
            </span>
          </div>
        </div>
  )
}

export default LoyaltyProgress
