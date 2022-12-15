import QRCode from 'qrcode'

export default function qrGenerator(prompt) {
   QRCode.toDataURL(prompt, {
			width: 800,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)
      return url
		}
    )
    
}
