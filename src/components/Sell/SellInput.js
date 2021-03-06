import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import ActiveButton from '../common/ActiveButton'
import InactiveButton from '../common/InactiveButton'
import store from '../../stores/Root'
import { collateralType } from '../../config.json'

const FormWrapper = styled.div`
  height: 200px;
  padding: 6px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 24px;
  color: var(--dark-text-gray);
  margin-bottom: 12px;
`

const FormInfoText = styled.div`
  color: var(--light-text-gray);
`

const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: rgba(48, 79, 254, 0.2);
  border: 1px solid rgba(48, 79, 254, 0.2);
  border-radius: 4px;
  height: 34px;
  line-height: 34px;
  margin-top: 12px;
  margin-bottom: 33px;
  font-weight: 600;
  font-size: 15px;
  input, input:focus {
    border: none;
    font-size: inherit;
    outline: none;
    ::placeholder {
      color: rgba(48, 79, 254, 0.4);
    }
  }
`

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`

const ErrorValidation = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  position: absolute;
  padding-top: 40px;
  align-self: flex-end;
  color: red;
`

@observer
class SellInput extends React.Component {
  state = {
    hasError: false
  };

  checkActive() {
    if (store.tradingStore.sellAmount > 0) {
      return true
    } else {
      return false
    }
  }

  validateNumber(value) {
    if (value > 0) {
      store.tradingStore.setSellAmount(value)
    }
    this.setState({ hasError: !(value > 0)})
  }

	render() {
    const { hasError } = this.state
    const price = store.tradingStore.formatPrice()
    const rewardForSell = store.tradingStore.formatRewardForSell()

    const Button = ({active, children, onClick}) => {
      if (active === true) {
        return (
          <ActiveButton onClick={onClick}>{children}</ActiveButton>
        ) 
      } else {
        return (
          <InactiveButton onClick={onClick}>{children}</InactiveButton> 
        )
      }
    }

	  return (
      <FormWrapper>
        <InfoRow>
          <FormInfoText>Price</FormInfoText>
          <div>{price} {collateralType}</div>
        </InfoRow>
        <InfoRow>
          <FormInfoText>Receive</FormInfoText>
          <div>{rewardForSell} {collateralType}</div>
        </InfoRow>
        <InputColumn>
          <FormContent>
            <input className="form-vivid-blue" type="text" placeholder="0" onChange={e => this.validateNumber(e.target.value)} />
            <div>DXD</div>
          </FormContent>
          {
            hasError ?
              <ErrorValidation>
                <p>Must be a positive number</p>
              </ErrorValidation>
            : 
            <>
            </>
          }
        </InputColumn>
        <Button active={this.checkActive()} onClick={() => {store.tradingStore.sell(); store.tradingStore.sellingState = 1}}>Sell DXD</Button>
	  	</FormWrapper>
	  )
	}
}

export default SellInput
