import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import formatMoneyWithDot from '../../assets/constants/until';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import KeyboardArrowUpIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/ArrowUpward';
import AppToast from '../../myTool/AppToast';

// import

import {
	getCartByUserIdAPI,
	getCartDescriptionByCartIdAPI,
	deleteCartByIdAPI,
	confirmCartDescriptionByIdAPI,
	deleteCartDescriptionByIdAPI,
	getUserInfo,
} from '../../services/index';
import { CartDetail } from '../../assets/constants/all-enum';

function Row(props: any) {
	const { row, getCartById, idUser, idCardNumber } = props;
	const [open, setOpen] = React.useState(false);
	const [totalPriceCartAfterAccept, setTotalPriceCartAfterAccept] = useState(0);
	const [openToast, setOpenToast] = React.useState(false);
	const [contentToast, setContentToast] = React.useState('');
	const [severity, setSeverity] = React.useState('');
	const [listProduct, setListProduct] = useState<any>([]);
	const [listService, setListService] = useState<any>([]);
	const [listProductAdd, setListProductAdd] = useState<any>([]);

	console.log('row', row);

	const [openDialog, setOpenDialog] = useState(false);

	function formatDate(str: any) {
		const date = str.split('T');
		const day = date[0].split('-');
		return day[2] + '/' + day[1] + '/' + day[0];
	}

	useEffect(() => {
		//const priceServices =
		//	listProduct?.services?.reduce(
		//		(a: any, b: any) => a + b?.quantity * b?.service?.price,
		//		0
		//	) || 0;
		const priceProduct =
			listProduct?.reduce(
				(a: any, b: any) => a + b?.quantity * b?.price,
				0
			) || 0;
		const priceProductAdd =
			listProductAdd?.reduce(
				(a: any, b: any) => a + b?.quantity * b?.price,
				0
			) || 0;
		setTotalPriceCartAfterAccept(priceProduct + priceProductAdd);
	}, [listProduct, listProductAdd]);

	const getCartDescription = async (id: any) => {
		try {
			const res = await getCartDescriptionByCartIdAPI(id);
			if (res?.status === 200) {
				setListProduct(res?.data?.filter((value: any) => value?.type !== 'B??o gi??'));
				setListProductAdd(res?.data?.filter((value: any) => value?.type === 'B??o gi??'));
			}
		} catch (error) { }
	};

	//confirm cart description
	const confirmCartById = async (id: any, afterPrice: any) => {
		const body = {
			id: id,
			newPrice: afterPrice,
		};

		try {
			const res = await confirmCartDescriptionByIdAPI(body);
			if (res?.status === 200) {
				getCartById(idCardNumber);
				getCartDescription(row?.id)
			}
		} catch (error) { }
	};

	// delete cart additional
	const deleteAdditionalProductInCart = async (id: any) => {
		try {
			const res = await deleteCartDescriptionByIdAPI(id);
			if (res?.status === 200) {
				getCartById(idCardNumber);
				getCartDescription(row?.id)
			}
		} catch (error) { }
	};

	const handleConfirmProductAdd = (id: any, afterPrice: any) => {
		setOpen(!open);
		confirmCartById(id, afterPrice);
	};

	const handleDeleteProductAdd = (id: any) => {
		setOpen(!open);
		deleteAdditionalProductInCart(id);
	};

	const handleClick = () => {
		setOpen(!open);
		getCartDescription(row?.id);
	};

	const handleCancelOrder = (id: number) => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	// delete nguy??n cart
	const handleDeleteCart = async () => {
		try {
			const res = await deleteCartByIdAPI({
				cartId: row?.id,
				idUser,
			});
			if (res?.status === 200) {
				setOpenToast(true);
				setContentToast('H???y ????n h??ng th??nh c??ng');
				setSeverity('success');
				setOpenDialog(false)
				setTimeout(() => getCartById(idCardNumber), 1000)
			} else {
				setOpenToast(true);
				setContentToast('???? x???y ra l???i khi h???y ????n h??ng');
				setSeverity('error');
			}
		} catch (error) { }
	};

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={handleClick}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row?.id}
				</TableCell>
				<TableCell align="center">
					{formatDate(row?.createTime)}
				</TableCell>
				<TableCell align="center">
					{row?.timeToDone ? formatDate(row?.timeToDone) : ""}
				</TableCell>
				<TableCell align="center">
					{row?.status?.name}
				</TableCell>
				<TableCell align="center">
					{formatMoneyWithDot(row?.totalPrice)}
				</TableCell>
				{row?.status?.name === CartDetail.PENDING && (
					<TableCell>
						<Button onClick={() => handleCancelOrder(row?.id)}>
							H???y
						</Button>
					</TableCell>
				)}
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={7}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						{listProduct?.length > 0 ? (
							<Box sx={{ margin: 4 }}>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
								>
									S???n ph???m
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>T??n s???n ph???m</TableCell>
											<TableCell align="center">Gi??</TableCell>
											<TableCell align="center">
												S??? l?????ng
											</TableCell>
											<TableCell align="right">
												T???ng
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listProduct?.map((value: any) => (
											<TableRow>
												<TableCell
													component="th"
													scope="row"
													sx={{ width: '400px' }}
												>
													{value?.product?.name}
												</TableCell>
												<TableCell align="center">
													{formatMoneyWithDot(value?.price)}
												</TableCell>
												<TableCell align="center">
													{value?.quantity}
												</TableCell>
												<TableCell align="right">
													{formatMoneyWithDot(
														value?.price *
														value?.quantity
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						) : null}
						{listService?.length > 0 ? (
							<Box sx={{ margin: 4 }}>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
								>
									D???ch v???
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>T??n s???n ph???m</TableCell>
											<TableCell align="center">
												S??? l?????ng
											</TableCell>
											<TableCell align="right">
												Gi?? ti???n
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listService?.map((value: any) => (
											<TableRow>
												<TableCell
													component="th"
													scope="row"
													sx={{ width: '400px' }}
												>
													{value?.serviceId?.name}
												</TableCell>
												<TableCell align="center">
													{value?.quantity}
												</TableCell>
												<TableCell align="right">
													{formatMoneyWithDot(
														value?.servicePrice *
														value?.quantity
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						) : null}
						{listProductAdd?.length > 0 ? (
							<Box sx={{ margin: 4 }}>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
								>
									S???n ph???m ???????c th??m sau khi ki???m tra
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell>T??n s???n ph???m</TableCell>
											<TableCell align="center">Gi??</TableCell>
											<TableCell align="center">
												S??? l?????ng
											</TableCell>
											<TableCell align="right">
												T???ng
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{/*{listProduct?.map((value: any) => (
											<TableRow>
												<TableCell
													component="th"
													scope="row"
													sx={{ width: '400px' }}
												>
													{value?.product?.name}
												</TableCell>
												<TableCell align="center">
													{value?.quantity}
												</TableCell>
												<TableCell align="right">
													{formatMoneyWithDot(
														value?.price *
														value?.quantity
													)}
												</TableCell>
											</TableRow>
										))}*/}
										{listProductAdd?.map((value: any) => (
											<TableRow>
												<TableCell
													component="th"
													scope="row"
													sx={{ width: '400px' }}
												>
													{value?.product?.name}
												</TableCell>
												<TableCell align="center">
													{formatMoneyWithDot(value?.price)}
												</TableCell>
												<TableCell align="center">
													{value?.quantity}
												</TableCell>
												<TableCell align="right">
													{formatMoneyWithDot(
														value?.price * value?.quantity
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Box>
						) : null}
						{listProductAdd?.length > 0 ? (
							<Box
								width="100%"
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									margin: '30px 0px ',
								}}
							>
								<Box
									sx={{
										fontWeight: 'bold',
										alignSelf: 'end',
									}}
								>
									T???ng ti???n sau khi ???????c b??o gi??:{'   '}
								</Box>
								<Box
									sx={{
										mr: 4,
										ml: 2,
										fontSize: 24,
										fontWeight: 'bold',
										color: 'red',
									}}
								>
									{formatMoneyWithDot(totalPriceCartAfterAccept)}
								</Box>
							</Box>
						) : null}
						{listProductAdd?.length > 0 ? (
							<Box
								width="100%"
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									margin: '30px 10px ',
								}}
							>
								<Button
									onClick={() =>
										handleConfirmProductAdd(
											listProductAdd?.[0]?.cart?.id,
											totalPriceCartAfterAccept
										)
									}
								>
									X??c nh???n
								</Button>
								<Button onClick={() => handleDeleteProductAdd(listProductAdd?.[0]?.cart?.id)}>
									Hu???
								</Button>
							</Box>
						) : null}
					</Collapse>
				</TableCell>
			</TableRow>
			<Dialog
				open={openDialog}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					X??c nh???n h???y ????n h??ng?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						B???n ch???c ch???n mu???n h???y ????n h??ng n??y ch????
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>H???y b???</Button>
					<Button onClick={handleDeleteCart} autoFocus>
						?????ng ??
					</Button>
				</DialogActions>
			</Dialog>
			<AppToast
				content={contentToast}
				type={0}
				isOpen={openToast}
				severity={severity}
				callback={() => {
					setOpenToast(false);
				}}
			/>
		</React.Fragment>
	);
}

export default function CollapsibleTable() {
	const [rows, setRows] = useState([]);
	const [idCardNumber, setIdCardNumber] = useState();
	const [idUser, setIdUser] = useState();

	const onGetUserInformation = useCallback(async () => {
		const response = await getUserInfo();
		if (response?.status === 200) {
			setIdUser(response?.data?.id);
			setIdCardNumber(response?.data?.idCardNumber);
			getCartByUserId(response?.data?.idCardNumber);
		} else {
			setIdCardNumber(null as any);
		}
	}, []);

	const getCartByUserId = async (id: any) => {
		try {
			const res = await getCartByUserIdAPI(id);
			setRows(res?.data);
		} catch (error) { }
	};

	useEffect(() => {
		onGetUserInformation();
		getCartByUserId(idCardNumber);
	}, [onGetUserInformation, idCardNumber]);

	return (
		<Box>
			<Box>
				<Typography
					style={{
						fontSize: '40px',
						fontWeight: '700',
						marginBottom: '55px',
						marginTop: '102px',
						width: '100%',
						textAlign: 'center',
					}}
				>
					????N H??NG ???? ?????T
				</Typography>
			</Box>
			<Box width="80.4%" m="auto">
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>M?? ????n h??ng</TableCell>
								<TableCell align="center">T???o l??c</TableCell>
								<TableCell align="center">D??? ki???n xong</TableCell>
								<TableCell align="center">Tr???ng th??i</TableCell>
								<TableCell align="center">Gi?? </TableCell>
								<TableCell align="center" />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.map((row: any) => (
								<Row
									key={row?.id}
									row={row}
									getCartById={getCartByUserId}
									idUser={idUser}
									idCardNumber={idCardNumber}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}
