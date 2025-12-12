import React from 'react'
import StatsCard from './statsCard'

function StatsCardsSection() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
    <StatsCard title="Wallet Balance" value="50.00" money={true} >
        <div className={`p-3 bg-purple-100 dark:bg-purple-900 rounded-full`}>
    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
    </svg>
    </div>
    </StatsCard>
    <StatsCard title='Reward Points' value='1,250' money={true}
        
       >
        <div className={`p-3 bg-green-100 dark:bg-green-900 rounded-full`}>
         <svg className="w-6 h-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path>
        <circle cx="12" cy="12" r="10"></circle>
    </svg>
    </div>
        </StatsCard>
        <StatsCard title='Total Spent' value='1,250' money={true}
        
       >
        <div className={`p-3 bg-purple-100 dark:bg-purple-900 rounded-full`}>
        <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" width="13" height="15" viewBox="0 0 13 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.37833 14.7315L12.153 13.917L12.7727 12.3003L7.99858 13.1148L7.37833 14.7315Z"></path>
                                <path d="M9.09164 8.45597L12.3802 7.89488L13 6.27819L9.14046 6.9369L9.31351 1.58047L7.7836 2.80667L7.6416 7.19279L6.19205 7.4403L6.40998 0.731445L4.88006 1.95765L4.69468 7.6952L1.52292 8.23656L0.903169 9.85325L4.64587 9.21476L4.58522 11.0933L0.664042 11.7623L0.0437927 13.3785L4.3244 12.6478C4.51817 12.6148 4.6932 12.5132 4.81794 12.3619L5.90559 11.0435C6.02097 10.9039 6.08654 10.7299 6.09246 10.5489L6.14373 8.95838L7.59328 8.71087L7.49714 11.6879L12.3142 10.866L12.9339 9.24927L9.04431 9.91291L9.09164 8.45498V8.45597Z"></path>
                            </svg>
    </div>
        </StatsCard>
        <StatsCard title='Wishlist Items' value='12'  
        money={false}
        
        >
         <div className={`p-3 bg-red-100 dark:bg-red-900 rounded-full`}>
         <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
     </div>
         </StatsCard>
         <StatsCard title='Total Orders' value='12'  
        money={false}
        
        >
        <div className={`p-3 bg-blue-100 dark:bg-blue-900 rounded-full`}>
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
         </StatsCard>
    
    
    
    </div>
  )
}

export default StatsCardsSection
