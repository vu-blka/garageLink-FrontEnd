// import Navbar from "../../component/Navbar/Nabar"
import Container from '@mui/material/Container';
import { Fragment, useEffect, useState, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { setLogin, setInfor } from "../../actions/action";

// import style from "./style.module.scss";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
// import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { getUserInfo } from '../../services/index';
import { useNavigate } from 'react-router-dom';

import AppToast from '../../myTool/AppToast';
import {
	validateEmail,
	validatePhoneNumber,
} from '../../assets/constants';

import { updatePasswordAPI, updateInfoAPI } from '../../services/index';
import styles from '../style.module.css';

function Infor() {
	const [userInfo, setUserInfo] = useState<any>({});
	const inputFile = useRef(null);
	const [open, setOpen] = useState(false);
	const [openToast, setOpenToast] = useState(false);

	const [oldPass, setOldPass] = useState('');
	const [isValidOldPass, setIsValidOldPass] = useState(false);

	const [messApi, setMessApi] = useState('');
	const [isValidNewPass, setIsValidNewPass] = useState(false);

	const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [avatar, setAvatar] = useState<any>('');

	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reNewPassword, setReNewPassword] = useState('');

	const [contentToast, setContentToast] = useState('');
	const [severity, setSeverity] = useState('');
	const navigate = useNavigate();

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const checkLogin = useCallback(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [navigate]);

	const onGetUserInformation = async () => {
		const response = await getUserInfo();
		if (response.status === 200) {
			setUserInfo(response.data);
		} else {
			setUserInfo(null as any);
		}
	};

	const updatePassword = async () => {
		if (password !== '' && newPassword !== '' && reNewPassword !== '') {
			if (newPassword === reNewPassword) {
				try {
					const body = {
						idCardNumber: userInfo?.idCardNumber,
						_id: userInfo?._id,
						password: password,
						newPassword: newPassword,
					};
					const res = await updatePasswordAPI(body);
					if (res.status === 200) {
						setOpenToast(true);
						setSeverity('success');
						setContentToast(res?.data);
						setOpen(false);
					} else {
						setOpenToast(true);
						setSeverity('error');
						setContentToast(res);
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const updateInfo = async () => {
		setLoading(true);
		if (!name || !phoneNumber || !email || !address) {
			setMessage('Vui l??ng nh???p ?????y ????? th??ng tin');
		} else {
			try {
				const body = {
					idCardNumber: userInfo?.idCardNumber,
					_id: userInfo?._id,
					name: name,
					address: address,
					phoneNumber: phoneNumber,
					email: email,
					avatar: avatar,
				};
				const res = await updateInfoAPI(body);
				if (res.status === 200) {
					setLoading(false);
					setOpenToast(true);
					setSeverity('success');
					setContentToast(res?.data);
					setOpen(false);
					getUserInfo();
				} else {
					setOpenToast(true);
					setSeverity('error');
					setContentToast(res);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		if (newPassword !== reNewPassword) {
			setIsValidConfirmPass(true);
		} else {
			setIsValidConfirmPass(false);
		}
	}, [newPassword, reNewPassword]);

	useEffect(() => {
		setName(userInfo?.name);
		setPhoneNumber(userInfo?.phoneNumber);
		setEmail(userInfo?.email);
		setAddress(userInfo?.address);
		setAvatar(userInfo?.avatar);
	}, [userInfo]);

	useEffect(() => {
		checkLogin();
		onGetUserInformation();
	}, [checkLogin]);

	return (
		<Fragment>
			{/* <Navbar /> */}
			<Container maxWidth="lg">
				<Box sx={{ flexGrow: 1 }}>
					<Typography
						sx={{ mt: 6, mb: 6, fontSize: 'bold' }}
						gutterBottom
						variant="h6"
						component="div"
						color="#2980B9"
					>
						TH??NG TIN C?? NH??N
					</Typography>
					<Container maxWidth="md">
						<div className={styles.user_avatar}>
							<Badge
								overlap="circular"
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								badgeContent={
									<IconButton
										style={{
											backgroundColor: 'rgb(222 216 213)',
										}}
										aria-label="edit"
										size="medium"
										color="success"
									// onClick={()=>{handleUploadAvatar()}}
									>
										{/* <EditIcon fontSize="inherit" /> */}
									</IconButton>
								}
							>
								<img
									src={
										avatar
											? `http://localhost:5000/api/image/${avatar.filename}`
											: require('../../assets/images/default_avatar.png')
									}
									alt="user_avatar"
									className={styles.user_avatarImage}
								/>
							</Badge>
						</div>
						<Grid container rowSpacing={4}>
							<Grid
								item={true}
								container
								direction="row"
								columnSpacing={3}
							></Grid>
							<Grid
								item={true}
								container
								direction="row"
								columnSpacing={3}
							>
								<Grid item={true} md={6}>
									<TextField
										label="H??? t??n"
										color="primary"
										fullWidth={true}
										value={name || ''}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</Grid>
								<Grid item={true} md={6}>
									<TextField
										label="??i???n tho???i"
										color="primary"
										type="number"
										fullWidth={true}
										value={phoneNumber || ''}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
										error={
											!validatePhoneNumber(phoneNumber)
										}
										helperText={
											!validatePhoneNumber(phoneNumber) &&
											'S??? ??i???n tho???i bao g???m 10 ch??? s??? v?? b???t ?????u b???ng 0'
										}
									/>
								</Grid>
							</Grid>
							<Grid item={true} md={12}>
								<TextField
									label="Email"
									color="primary"
									fullWidth={true}
									value={email || ''}
									onChange={(e) => setEmail(e.target.value)}
									error={!validateEmail(email)}
									helperText={
										!validateEmail(email) &&
										'Vui l??ng nh???p ????ng ?????nh d???ng Email'
									}
								/>
							</Grid>

							<Grid item={true} md={12}>
								<TextField
									label="?????a ch???"
									color="primary"
									fullWidth={true}
									value={address || ''}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Grid>

							{/*<Grid item={true} md={12}>
								<TextField
									label="Avatar"
									color="primary"
									fullWidth={true}
									value={avatar || ''}
									onChange={(e) => setAvatar(e.target.value)}
								/>
							</Grid>*/}

							{message && (
								<p
									style={{
										color: 'red',
										fontWeight: 'bold',
									}}
								>
									{message}
								</p>
							)}
							<div
								style={{
									width: '100%',
									display: 'flex',
									marginTop: '20px',
								}}
							>
								<Grid item={true} md={4}>
									<Button
										variant="contained"
										onClick={updateInfo}
									>
										?????i th??ng tin ng?????i d??ng
									</Button>
								</Grid>

								<Grid item={true} md={6}>
									<Button
										variant="contained"
										onClick={() => setOpen(true)}
									>
										?????i m???t kh???u
									</Button>
								</Grid>
							</div>
							<Dialog
								open={open}
								//   onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">
									?????i m???t kh???u
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										<TextField
											label="M???t kh???u c??"
											color="primary"
											fullWidth={true}
											margin="dense"
											// onChange={handleChangeOldPass}

											error={isValidOldPass}
											helperText={
												!isValidOldPass
													? ''
													: 'M???t kh???u kh??ng h???p l???'
											}
										/>
									</DialogContentText>
									<Grid item={true} md={12}>
										<TextField
											label="?????a ch???"
											color="primary"
											fullWidth={true}
											value={userInfo.address}
										/>
									</Grid>
									<Grid item={true} md={12}>
										<Button variant="contained">
											?????i m???t kh???u
										</Button>
										<Dialog
											open={open}
											// onClose={handleClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogTitle id="alert-dialog-title">
												?????i m???t kh???u
											</DialogTitle>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													<TextField
														label="M???t kh???u c??"
														color="primary"
														fullWidth={true}
														margin="dense"
														onChange={(e) =>
															setPassword(
																e.target.value
															)
														}
														error={isValidOldPass}
														helperText={
															!isValidOldPass
																? ''
																: 'M???t kh???u kh??ng h???p l???'
														}
													/>
													<div>
														<TextField
															label="M???t kh???u m???i"
															color="success"
															fullWidth={true}
															margin="dense"
															onChange={(e) =>
																setNewPassword(
																	e.target
																		.value
																)
															}
															error={
																isValidNewPass
															}
															helperText={
																!isValidNewPass
																	? ''
																	: messApi
															}
														/>
														<TextField
															label="Nh???p l???i m???t kh???u m???i"
															color="success"
															fullWidth={true}
															margin="dense"
															onChange={(e) =>
																setReNewPassword(
																	e.target
																		.value
																)
															}
														/>
														{isValidConfirmPass && (
															<div
																style={{
																	color: 'red',
																	fontWeight:
																		'bold',
																	marginTop:
																		'10px',
																}}
															>
																Nh???p l???i m???t
																kh???u kh??ng kh???p
															</div>
														)}
													</div>
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button
													onClick={() =>
														setOpen(false)
													}
												>
													H???y
												</Button>
												<Button
													onClick={updatePassword}
												>
													X??c nh???n
												</Button>
											</DialogActions>
										</Dialog>
									</Grid>
								</DialogContent>
							</Dialog>
						</Grid>
					</Container>
				</Box>
			</Container>
			<AppToast
				content={contentToast}
				type={0}
				isOpen={openToast}
				severity={severity}
				callback={() => {
					setOpenToast(false);
				}}
			/>
			<input
				type="file"
				id="file"
				ref={inputFile}
				accept="image/png, image/jpeg"
				style={{ display: 'none' }}
			// onChange={(event)=>onChangeFile(event)}
			/>
		</Fragment>
	);
}
export default Infor;
