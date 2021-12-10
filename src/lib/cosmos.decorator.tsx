import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from 'constants/locales'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import styled, { darkTheme, defaultTheme, lightTheme } from 'lib/theme'
import { ReactNode, useEffect } from 'react'
import { useSelect, useValue } from 'react-cosmos/fixture'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'widgets-web3-react/types'

import Widget from './components/Widget'
import Connectors from './cosmos/components/Connectors'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const providerAtom = atom<Provider | undefined>(undefined)

export default function WidgetDecorator({ children }: { children: ReactNode }) {
  const provider = useAtomValue(providerAtom)

  const [width] = useValue('width', { defaultValue: 272 })
  const [locale] = useSelect('locale', { defaultValue: DEFAULT_LOCALE, options: ['pseudo', ...SUPPORTED_LOCALES] })
  const [darkMode] = useValue('dark mode', { defaultValue: false })
  const [theme, setTheme] = useValue('theme', { defaultValue: { ...defaultTheme, ...lightTheme } })
  useEffect(() => {
    setTheme({ ...defaultTheme, ...(darkMode ? darkTheme : lightTheme) })
  }, [darkMode, setTheme])

  return (
    <>
      <GlobalStyle />
      <Connectors />
      <Wrapper>
        <Widget width={width} theme={theme} locale={locale} provider={provider}>
          {children}
        </Widget>
      </Wrapper>
    </>
  )
}