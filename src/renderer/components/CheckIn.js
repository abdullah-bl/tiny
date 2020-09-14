import React, { useState, useEffect } from 'react'
import { LogIn, UserCheck } from 'react-feather'
import DatePicker from '@deskpro/react-datepicker-hijri'
import moment from 'moment-hijri'
import { connect } from 'unistore/react'

import { Input, Select } from './Input'
import { db, GustSchema, Alert, islamicDate } from '../utils'
import useForm from '../hooks/useForm'
import ActionBar from './ActionBar'

import '@deskpro/react-datepicker-hijri/dist/react-datepicker.css'

import 'moment/locale/ar'

const gust = {
	id: '',
	name: '',
	rank: '',
	unit: '',
	phone: '',
	checkIn: new Date(),
}

const CheckIn = ({
	ranks,
	units,
	history: { goBack },
	match: {
		params: { _id },
	},
}) => {
	const { state, onChange, set } = useForm(gust)
	const renderRanks = ['اختر', ...ranks.split(/\n/).map((s) => s.trim())]
	const renderUnits = ['اختر', ...units.split(/\n/).map((s) => s.trim())]

	useEffect(() => {
		set({ roomId: _id })
	}, [_id])

	const onDayClick = (checkIn, e) =>
		set({ ...state, checkIn: new Date(checkIn) })

	const getUserById = async (e) => {
		if (e.key === 'Enter') {
			const data = await db.Reservation.findOne({
				id: Number(e.target.value.trim()),
			}).sort({ createdAt: -1 })
			if (data) {
				const { name, id, unit, rank, phone } = data
				return set({ name, id, unit, rank, phone })
			} else {
				return Alert({
					title: 'يوجد خطاء',
					type: 'error',
					detail: 'البيانات غير موجودة او الرقم العسكري خطاء',
				})
			}
		}
	}

	async function save() {
		try {
			let doc = await GustSchema.validateAsync(state)
			let old = await db.Reservation.findOne({ id: doc.id, paid: false })
			if (old) throw Error(`${doc.name} تم تسجلة مسبقاً و لم يتم تسجيل الخروج!`)
			await db.Reservation.insert(doc)
			await db.Residence.update(
				{ _id },
				{ $set: { isRented: true, status: 'غير شاغرة' } }
			)
			Alert({
				message: 'تم بنجاح',
				detail: `تم تسجيل الدخول لـ (${doc.name}) `,
			})
			goBack()
		} catch (error) {
			console.log('error', error)
			Alert({ type: 'error', message: error.message })
		}
	}

	return (
		<>
			<main>
				<div className='row'>
					<div className='col' style={{ textAlign: 'center' }}>
						<h1>اضافة ساكن</h1>
					</div>
					<div className='col-12'>
						<Input
							defaultValue={state.name}
							onChange={onChange}
							label='الاسم كامل'
							id='name'
							placeholder='اكتب الاسم كامل...'
						/>
					</div>
					<div className='col-6'>
						<Input
							defaultValue={state.id}
							onChange={onChange}
							label='الرقم العسكري'
							id='id'
							type='number'
							min={0}
							placeholder='الرقم السعكري...'
						/>
					</div>
					<div className='col-6'>
						<Input
							maxLength={10}
							defaultValue={state.phone}
							onChange={onChange}
							label='رقم الجوال'
							id='phone'
							type='number'
							min={0}
							placeholder='رقم الجوال...'
						/>
					</div>
					<div className='col-6'>
						{/* <Input defaultValue={state.rank} onChange={onChange} label='الرتبة' id='rank' placeholder='...' /> */}
						<Select
							label='اختر الرتبة'
							id='rank'
							defaultValue={state.rank}
							onChange={onChange}
							options={renderRanks}
						/>
					</div>
					<div className='col-6'>
						{/* <Input defaultValue={state.unit} onChange={onChange} label='الوحدة' id='unit' placeholder='الوحدة...' /> */}
						<Select
							label='اختر الوحدة'
							id='unit'
							defaultValue={state.unit}
							onChange={onChange}
							options={renderUnits}
						/>
					</div>
					<div className='col-12'>
						<label htmlFor='checkIn'>تاريخ الدخول</label>
						<DatePicker
							inline
							id='checkIn'
							calendar='hijri'
							locale='ar-SA'
							selected={moment(state.checkIn)}
							onChange={onDayClick}
						/>
					</div>
				</div>
			</main>
			<ActionBar back>
				<div className='search'>
					<Input
						type='number'
						label='بحث بالرقم العسكري'
						placeholder='بحث بالرقم العسكري...'
						onKeyUp={getUserById}
					/>
				</div>
				<a onClick={save}>
					<span>تسجيل الدخول</span>
					<UserCheck />
				</a>
			</ActionBar>
		</>
	)
}

export default connect('ranks, units', {})(CheckIn)
