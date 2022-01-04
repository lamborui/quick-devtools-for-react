/*! This module home DOM Root **/
import React, { Component, useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { AutoCenter } from 'antd-mobile'
import logoImg from '~Asset/logo.png'

import { appVersion, appTitle } from '~Lib/env'
import { Select } from '~/widgets/select'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // a: true, // Page cache state defined here.
    }
  }

  componentDidMount() {
    //here regist some eventlistener or handle init.
  }

  componentWillUnmount() {
    //here unregist some eventlistener or handle destory.
  }

  renderHeader() {
    return (
      <div className='home__header'>
        <img src={logoImg} alt={appTitle} />
        <NetworkSelector />
      </div>
    )
  }

  renderContent() {
    const { t } = this.props
    return (
      <div className='home__content'>
        <div className='inner'>
          <AutoCenter>{t('basDescription')}</AutoCenter>
        </div>
      </div>
    )
  }

  renderFooter() {
    return (
      <div className='home__footer'>
        <span className='version-label'>Version:</span>
        <span className='app-version'>{appVersion}</span>
      </div>
    )
  }

  render() {
    // const {t,isDarkTheme} = this.props
    // translation use: t('key',options)

    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </>
    )
  }
}

function NetworkSelector(props) {
  const [network, setNeteork] = useState('')

  useEffect(() => {
    setNeteork('ropsten')
  }, [])

  return (
    <div className='network-wrapper'>
      <Select
        defaultValue={network}
        onChange={({ value, label }) => {
          console.log('>>>>>>>>>>>>>>>>>>>>', value, label)
          setNeteork(value)
        }}
      >
        <Select.Option value='ropsten' label='Ropsten'></Select.Option>
        <Select.Option value='mainnet' label='Mainnet'></Select.Option>
      </Select>
      <div className={`network-dot ${network}`}></div>
    </div>
  )
}

export default withTranslation()(HomePage)
