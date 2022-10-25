import React, { useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const ColorModeContext = React.createContext({})

export const ToggleColorMode = ({ children }) => {
	const [mode, setMode] = useState('dark')

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'dark' ? 'light': 'dark'))
		}
	}), [mode])

	const toggleColor = (colorDark, colorLight) => {
		return mode === 'dark' ? colorDark : colorLight
	}

	const theme = useMemo(() => 
		createTheme({
			palette: {
				mode,
				primary: {
					main: toggleColor('#90caf9','#222')
				},
				secondary: {
					main: blueGrey[700],
				},
				background: {
					default: toggleColor('#222', '#FFF9CA') 
				}
			},
			components: {
				MuiAppBar: {
					defaultProps: { 
						elevation: 0
					},
					styleOverrides: {
						root: {
							backgroundColor: toggleColor('#111', '#ABC9FF'),
						}
					}
				},
				MuiTextField: {
					styleOverrides: {
						root: {
							fontSize: 20
						}
					}
				}
			}
		})
	, [mode])

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
