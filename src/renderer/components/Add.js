import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'unistore/react'
import { Save } from 'react-feather'

import ActionBar from './ActionBar'
import { Input, Select, TextArea } from './Input'
import useForm from '../hooks/useForm'
import { RoomSchema, Alert, db, beforeInsertRoom } from '../utils'

const initialState = {
	hotel: '',
	roomNo: '101',
	isRented: false,
	numberOfBeds: 1,
	type: '',
}

const Add = ({ hotels }) => {
	const { state, onChange, resetState } = useForm(initialState)
	const renderHotel = ['اختر', ...hotels.split(/\n/).map((s) => s.trim())]

	useEffect(() => {
		return () => {}
	}, [])
	async function Submit(event) {
		event.preventDefault()
		try {
			let doc = await RoomSchema.validateAsync(state)
			await beforeInsertRoom({ roomNo: doc.roomNo, hotel: doc.hotel })
			await db.Residence.insert(doc)
			Alert({ type: 'info', message: 'تم الحفظ بنجاح' })
			resetState() // reset form
			document.getElementById('reset').click()
		} catch (error) {
			Alert({
				title: 'الإسكان',
				type: 'error',
				message: 'خطأ في ادخال البيانات',
				detail: String(error),
			})
		}
	}
	return (
		<>
			<main>
				<div className='container'>
					<h1>اضف سكن </h1>
					<form noValidate onSubmit={Submit}>
						<div className='row'>
							<div className='col-md-4 col-sm-6 col-xs-12'>
								<Select
									label='اختر المبنى'
									id='hotel'
									defaultValue={state.hotel}
									onChange={onChange}
									options={renderHotel}
								/>
							</div>
							<div className='col-md-4 col-sm-6 col-xs-12'>
								<Select
									label='النوع '
									id='type'
									defaultValue={state.type}
									onChange={onChange}
									options={['اختر', 'غرفة', 'جناح', 'حظيرة']}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-4 col-sm-6 col-xs-12'>
								<Input
									style={{ textAlign: 'center' }}
									type='text'
									caption='لايمكن تكرار رقم الغرفة!'
									label='رقم الجناح / الغرفة...'
									id='roomNo'
									placeholder='مثلاً ... 101 , G01, F02'
									value={state.roomNo}
									onChange={onChange}
								/>
							</div>
							<div className='col-md-4 col-sm-6 col-xs-12'>
								<Input
									min={0}
									lang='en-150'
									type='number'
									label='عدد الأسِرَّة'
									id='numberOfBeds'
									placeholder='مثلاً ... 1,2,4'
									value={state.numberOfBeds}
									onChange={onChange}
								/>
							</div>
							<div className='col-12'>
								<TextArea
									label='ملاحظات'
									id='note'
									placeholder='اكتب ملاحظاتك هنا...'
									value={state.note}
									onChange={onChange}
								/>
							</div>
						</div>
						<div style={{ display: 'none' }}>
							<button id='submit' type='submit'>
								submit
							</button>
							<button id='reset' type='reset'>
								reset
							</button>
						</div>
					</form>
				</div>
			</main>
			<ActionBar back>
				<a onClick={Submit}>
					<span> حفظ </span>
					<Save />
				</a>
			</ActionBar>
		</>
	)
}

export default connect('hotels, status', {})(Add)
