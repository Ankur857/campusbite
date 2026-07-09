import React from 'react'

const StatsCard = ({title,description}:{title:String,description:String}) => {
  return (
    <div className="transition-all duration-300">
        <div className='text-3xl md:text-4xl font-black text-orange-800 dark:text-orange-400 tracking-tight'>{title}</div>
        <p className='text-sm text-gray-600 dark:text-zinc-450 font-bold mt-1'>{description}</p>
    </div>
  )
}

export default StatsCard