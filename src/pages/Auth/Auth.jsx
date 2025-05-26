import { useState } from "react";
import "./Auth.scss";

import authImage from "../../assets/images/signin.png";
import emailIcon from "../../assets/images/icon_email.svg";
import googleIcon from "../../assets/images/icon_google.svg";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { registerWithEmailAndPassword, loginWithEmailAndPassword, loginWithGoogle, logout } from "../../app/authSlice";
import { AUTH_TYPES, FIELDS_TYPES } from "../../utils/helpers";
import InputField from "./InputField/InputField";

function Auth() {
	const dispatch = useDispatch();

	const [authType, setAuthType] = useState(AUTH_TYPES.SIGN_IN);
	const [userData, setUserData] = useState({
		[FIELDS_TYPES.firstName]: "",
		[FIELDS_TYPES.lastName]: "",
		[FIELDS_TYPES.email]: "",
		[FIELDS_TYPES.phoneNumber]: "",
		[FIELDS_TYPES.password]: "",
		[FIELDS_TYPES.confirmPassword]: "",
	});

	async function handleEmailRegistration() {
		dispatch(registerWithEmailAndPassword({ email: userData.Email, password: userData.Password }));
	}

	function handleEmailLogin() {
		dispatch(loginWithEmailAndPassword({ email: userData.Email, password: userData.Password }));
	}

	async function handleGoogleLogin() {
		dispatch(loginWithGoogle({ email: userData.Email, password: userData.Password }));
	}

	function handleLogout() {
		dispatch(logout());
	}

	function handleUserData(event, fieldName) {
		setUserData((prevState) => {
			return {
				...prevState,
				[fieldName]: event.target.value,
			};
		});
	}

	function toggleAuthType() {
		setAuthType((prevType) => (prevType === AUTH_TYPES.SIGN_IN ? AUTH_TYPES.SIGN_UP : AUTH_TYPES.SIGN_IN));
	}

	return (
		<div className="auth-page">
			<div className="auth-image">
				<img alt="Authentication" src={authImage} className="auth-image-content" />
			</div>

			<div className="auth-form">
				<div className="auth-form__header">
					<div className="auth-form__logo">FASCO</div>
					<div className="auth-form__title">
						{authType === AUTH_TYPES.SIGN_IN ? "Sign In To FASCO" : "Create account"}
					</div>
					<div className="auth-form__social-buttons">
						<Button text={"Sign up with Email"} icon={emailIcon} onClick={() => console.log("auth with email")} />
						<Button text={"Sign up with Google"} icon={googleIcon} onClick={handleGoogleLogin} />
					</div>
					<div className="auth-form__divider">- OR -</div>
				</div>

				<div className="auth-form__fields">
					{authType === AUTH_TYPES.SIGN_IN ? (
						<div className="auth-form__fields-group">
							<InputField
								type="email"
								placeholder={FIELDS_TYPES.email}
								specialStyles="wide"
								value={userData[FIELDS_TYPES.email]}
								onChange={handleUserData}
							/>
							<InputField
								type="password"
								placeholder={FIELDS_TYPES.password}
								specialStyles="wide"
								value={userData[FIELDS_TYPES.password]}
								onChange={handleUserData}
							/>
						</div>
					) : (
						<>
							<div className="auth-form__fields-group">
								<InputField
									type="text"
									placeholder={FIELDS_TYPES.firstName}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.firstName]}
									onChange={handleUserData}
								/>
								<InputField
									type="email"
									placeholder={FIELDS_TYPES.email}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.email]}
									onChange={handleUserData}
								/>
								<InputField
									type="password"
									placeholder={FIELDS_TYPES.password}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.password]}
									onChange={handleUserData}
								/>
							</div>
							<div className="auth-form__fields-group">
								<InputField
									type="text"
									placeholder={FIELDS_TYPES.lastName}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.lastName]}
									onChange={handleUserData}
								/>
								<InputField
									type="text"
									placeholder={FIELDS_TYPES.phoneNumber}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.phoneNumber]}
									onChange={handleUserData}
								/>
								<InputField
									type="password"
									placeholder={FIELDS_TYPES.confirmPassword}
									specialStyles="narrow"
									value={userData[FIELDS_TYPES.confirmPassword]}
									onChange={handleUserData}
								/>
							</div>
						</>
					)}
				</div>

				<div className="auth-form__footer">
					<div className="auth-form__actions">
						<Button
							text={authType === AUTH_TYPES.SIGN_IN ? "Sign in" : "Register"}
							onClick={authType === AUTH_TYPES.SIGN_IN ? handleEmailLogin : handleEmailRegistration}
							specialStyles="black bold wide margin"
						/>
						<Button
							text={authType === AUTH_TYPES.SIGN_IN ? "Register Now" : "Back to Login"}
							onClick={toggleAuthType}
							specialStyles="bold wide margin"
						/>
						<Button text="Logout" onClick={handleLogout} specialStyles="bold wide black margin" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Auth;
