import { toast } from '@zerodevx/svelte-toast';

export const noteSuccess = (str) =>
	toast.push(str, {
		theme: {
			'--toastBackground': 'var(--primaryColorLite)',
			'--toastBarBackground': 'var(--primaryColor)',
			'--toastColor': 'var(--primaryColor)',
			'--toastPadding': '0.25rem 0.5rem'
		}
	});

export const noteFailure = (str) =>
	toast.push(str, {
		theme: {
			'--toastBackground': 'var(--errorColorLite)',
			'--toastBarBackground': 'var(--errorColor)',
			'--toastColor': 'var(--errorColor)',
			'--toastPadding': '0.25rem 0.5rem'
		}
	});
