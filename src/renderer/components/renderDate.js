
import React from 'react'
import moment from 'moment'
import { islamicDate } from '../utils'

moment.locale('ar-sa')

const RenderDate = ({ date }) => (
  <>
    <span style={{ fontWeight: 'normal' }}> {moment(date).format('MMMM Do YYYY dddd')}</span>
  - <span style={{ fontWeight: 'bold' }}>الموافق </span>
    <span style={{ fontWeight: 'normal' }}> {islamicDate(date)}</span>
  </>
)

export default RenderDate