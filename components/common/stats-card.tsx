import React from 'react'

const StatsCard = ({title,description}:{title:String,description:String}) => {
  return (
    <div>
        <div className='text-orange-800'>{title}</div>
        <p className='text-sm'>{description}</p>
    </div>
  )
}

export default StatsCard