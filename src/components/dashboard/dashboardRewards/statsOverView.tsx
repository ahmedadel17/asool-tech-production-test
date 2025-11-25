import StatsCard from "./statsCard";
import { useTranslations } from "next-intl";
interface StatsProps {
    totalEarnedLifetime: number;
    totalConvertedLifetime: number;
    totalValueEarned: number;
  }
  
  export default function StatsSection({
    totalEarnedLifetime,
    totalValueEarned,
    totalConvertedLifetime,
  }: StatsProps) {
    const t = useTranslations();
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Points Earned */}
        <StatsCard number={totalEarnedLifetime} label={t('Total Points Earned')}/>
        <StatsCard number={totalValueEarned} label={t('Total Value Earned')}/> 
        <StatsCard number={(totalConvertedLifetime)} label={t('Points Converted')}/> 

  
        {/* Points Converted */}
      
  
        {/* Total Value Earned */}
      
      </div>
    );
  }
  