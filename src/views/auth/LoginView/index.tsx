import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { loginAPI, forgotPasswordAPI } from '../../../services/index';
import AppToast from '../../../myTool/AppToast';
import { validateIdCardNumber } from '../../../assets/constants';

function Login() {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [open, setOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const [verifyAccount, setVerifyAccount] = useState('');
	const [idCardNumber, setIdCardNumber] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [errorVerify, setErrorVerify] = useState('');

	const [openToast, setOpenToast] = useState(false);
	const [contentToast, setContentToast] = useState('');
	const [severity, setSeverity] = useState('');

	let navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem('token');
	}, []);

	const handleChangeAccount = (event: any) => {
		setAccount(event.target.value);
	};
	const handleChangePassword = (event: any) => {
		setPassword(event.target.value);
	};

	const handleForgotPassword = () => {
		setOpen(true);
		setErrorVerify('');
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function changePassword(data: any) {
		const res = await forgotPasswordAPI(data);
		if (res?.status === 200) {
			setOpen(false);
			setOpenToast(true);
			setSeverity('success');
			setContentToast(res?.data);
		} else {
			setOpenToast(true);
			setContentToast(res);
			setSeverity('error');
		}
	}

	const handleCheckAccount = () => {
		if (!verifyAccount || !idCardNumber || !newPassword) {
			setErrorVerify('Vui l??ng nh???p ?????y ????? th??ng tin');
		} else if (!validateIdCardNumber(idCardNumber)) {
			setErrorVerify('Vui l??ng nh???p ????ng ?????nh d???ng th??ng tin');
		} else {
			const data = {
				username: verifyAccount,
				idCardNumber,
				newPassword,
			};
			changePassword(data);
		}
	};

	async function login(body: any) {
		const res = await loginAPI(body);
		if (res?.status === 200) {
			setErrorMsg('');
			localStorage.setItem('token', res?.data?.accessToken);
			navigate('/');
			window.location.reload();
		} else {
			setErrorMsg(res);
		}
	}

	const handleLogin = () => {
		console.log(account);
		if (!account || !password) {
			setErrorMsg('L???i: Vui l??ng nh???p ?????y ????? th??ng tin');
		} else {
			var data = {
				username: account,
				password: password,
			};
			login(data);
		}
	};

	return (
		<div>
			{/* <Banner /> */}
			<div
				style={{
					display: 'flex',
					marginTop: '80px',
					marginBottom: '80px',
					justifyContent: 'center',
					height: '400px',
				}}
			>
				<div
					style={{
						border: '1px solid #CCCCCC',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#FFFF',
					}}
				>
					<Box sx={{ marginBottom: '20px' }}>
						<Typography
							sx={{ fontSize: '30px', fontWeight: '700' }}
						>
							????NG NH???P
						</Typography>
					</Box>
					<FormControl
						sx={{ m: 1, width: '50ch' }}
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password">
							Username
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-text"
							type="text"
							value={account}
							onChange={handleChangeAccount}
							label="Username"
						/>
					</FormControl>
					<br />

					<FormControl
						sx={{ m: 1, width: '50ch' }}
						variant="outlined"
					>
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={handleChangePassword}
							endAdornment={
								<InputAdornment position="end">
									{/* <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton> */}
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
					<p style={{ color: 'red', fontWeight: 'bold' }}>
						{errorMsg}
					</p>
					<br />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<p
							style={{
								textDecoration: 'underline',
								color: '#551A8B',
							}}
							className="btnForgot"
							onClick={handleForgotPassword}
						>
							Qu??n m???t kh???u
						</p>
						&nbsp;&nbsp;&nbsp;
						<NavLink to="/register">
							<p>????ng k?? ?</p>
						</NavLink>
					</div>
					<LoadingButton
						variant="contained"
						style={{ marginTop: '10px' }}
						size="large"
						type="submit"
						// loading={loading}
						onClick={handleLogin}
					>
						????ng nh???p
					</LoadingButton>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Qu??n m???t kh???u?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Vui l??ng nh???p t??i kho???n v?? s??? CMND c???a b???n ????? ch??ng t??i
						x??c th???c!!
					</DialogContentText>
					<TextField
						sx={{ mt: 4 }}
						autoFocus
						margin="dense"
						id="name"
						label="T??i kho???n"
						type="username"
						fullWidth
						variant="outlined"
						onChange={(e) => setVerifyAccount(e.target.value)}
					/>
					<TextField
						sx={{ mt: 4 }}
						autoFocus
						margin="dense"
						id="idCardNumber"
						label="S??? CMND"
						type="number"
						fullWidth
						variant="outlined"
						error={
							!!idCardNumber && !validateIdCardNumber(idCardNumber)
						}
						helperText={
							idCardNumber &&
							!validateIdCardNumber(idCardNumber) &&
							'S??? CMND bao g???m 9 ch??? s???'
						}
						onChange={(e) => setIdCardNumber(e.target.value)}
					/>
					<TextField
						sx={{ mt: 4 }}
						autoFocus
						margin="dense"
						id="newPassword"
						label="M???t kh???u m???i"
						type="password"
						fullWidth
						variant="outlined"
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					{errorVerify && (
						<p style={{ color: 'red', fontWeight: 'bold' }}>
							{errorVerify}
						</p>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>H???y</Button>
					<Button onClick={handleCheckAccount}>X??c nh???n</Button>
				</DialogActions>
			</Dialog>
			{/* <Footer /> */}
			<AppToast
				content={contentToast}
				type={0}
				isOpen={openToast}
				severity={severity}
				callback={() => {
					setOpenToast(false);
				}}
			/>
		</div>
	);
}

export default Login;
