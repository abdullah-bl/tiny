import React, { useEffect, useState } from 'react'
import { connect } from 'unistore/react'
import { Edit3 } from 'react-feather'
import { Select, Input, TextArea } from './Input'
import ActionBar from './ActionBar'
import { db, Alert, UpdateRoomSchema } from '../utils'
import useForm from '../hooks/useForm'

const Edit = ({
	history,
	hotels,
	match: {
		params: { _id },
	},
}) => {
	const [data, setData] = useState({})
	const { state, onChange, set } = useForm({})
	const renderHotel = ['اختر', ...hotels.split(/\n/).map((s) => s.trim())]

	useEffect(() => {
		getData()
		return () => {}
	}, [_id])

	async function getData() {
		const data = await db.Residence.findOne({ _id })
		set(data)
		setData(data)
	}

	async function update() {
		try {
			console.log(state)
			let doc = await UpdateRoomSchema.validateAsync(state)
			// first check if roomNo dose not exists
			let found = await db.Residence.findOne({
				roomNo: doc.roomNo,
				hotel: doc.hotel,
			})
			if (found && found._id !== data._id) {
				let er = new Error(`رقم ال${doc.type} موجد مسبقا`)
				er.name = ''
				throw er
			}
			await db.Residence.update({ _id }, { $set: { ...doc } })
			Alert({ type: 'info', message: 'تم الحفظ بنجاح' })
			history.goBack()
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
				<div className='row'>
					<div className='col-12' style={{ textAlign: 'center' }}>
						<h2>
							تعديل {data.type} رقم {data.roomNo} في {data.hotel}
						</h2>
					</div>
				</div>
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
					<div className='row'>
						<div className='col-4'>
							<Select
								label='النوع '
								id='type'
								defaultValue={state.type}
								onChange={onChange}
								options={['اختر', 'غرفة', 'جناح', 'حظيرة']}
							/>
						</div>
						<div className='col-4'>
							<Input
								style={{ textAlign: 'center' }}
								type='text'
								caption='لايمكن تكرار رقم الغرفة!'
								label='رقم الجناح / الغرفة / الحظيرة'
								id='roomNo'
								placeholder='F01, G01, ...'
								defaultValue={state.roomNo}
								onChange={onChange}
								disabled
							/>
						</div>
						<div className='col-4'>
							<Input
								min={0}
								lang='en-150'
								type='number'
								label='عدد الأسِرَّة'
								id='numberOfBeds'
								placeholder='مثلاً ... 1,2,4'
								defaultValue={state.numberOfBeds}
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
				</div>
			</main>
			<ActionBar back>
				<a onClick={update}>
					<span>تعديل</span>
					<Edit3 />
				</a>
			</ActionBar>
		</>
	)
}

export default connect('hotels', {})(Edit)
