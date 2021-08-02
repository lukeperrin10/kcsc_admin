import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import StatCard from '../components/analytics/StatCard'
import VisibilityIcon from '@material-ui/icons/Visibility'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback'

const AnalyticsDashboard = () => {
  const { analytics } = useSelector((state) => state)

  useEffect(() => {
    
  }, [])

  return (
    <div className='analytics-container'>
      {analytics.visits ? (
        <>
          <div className='stat-container-1'>
            <StatCard
              value={analytics.visits?.total}
              title='Total site visits'
              icon={<VisibilityIcon />}
            />
            <StatCard
              value={analytics.events?.answers[9].value}
              title='Total amount of inquiries'
              icon={<QuestionAnswerIcon />}
            />
            <StatCard
              value={analytics.events?.calls}
              title='Total phone button clicks'
              icon={<PhoneCallbackIcon />}
            />
          </div>
        </>
      ) : (
        <h1 data-cy='analytics-error-message'>
          There were no analytics to be found. Let's hope we can dig them up
          later!
        </h1>
      )}
    </div>
  )
}

export default AnalyticsDashboard
