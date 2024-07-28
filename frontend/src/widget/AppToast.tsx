import React from "react"
import Toast from "react-bootstrap/Toast"

interface ToastProps {
	toastStyle: string
	toast: string
	setToast: Function
}

// Provides toast notifications based on provided prop values
function AppToast(props: ToastProps) {
	return (
		<Toast bg={props.toastStyle} onClose={() => props.setToast("")} show={props.toast !== ""} delay={3000} autohide>
			<Toast.Header>
				<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
				<strong className="me-auto">Notice</strong>
			</Toast.Header>
			<Toast.Body>{props.toast}</Toast.Body>
		</Toast>
	)
}

export default AppToast
