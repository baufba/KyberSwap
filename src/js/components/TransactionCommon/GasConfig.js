
import React from "react"
import ReactTooltip from 'react-tooltip'
import { filterInputNumber } from "../../utils/validators";
import GasOption from './GasOption';

const GasConfig = (props) => {
  let gas_option = {"f":props.translate("fast") || 'Fast',"l":props.translate("low") || 'Slow',"s":props.translate("standard") || 'Standard'}
  function specifyGasPrice(value) {
    if(value==="f")
      props.selectedGasHandler(gasPriceSuggest.fastGas, value)
    else if(value==="l")
      props.selectedGasHandler(gasPriceSuggest.safeLowGas, value)
    else if(value==="s")
      props.selectedGasHandler(gasPriceSuggest.standardGas, value)
  }
  function handleChangeGasPrice(e) {
    filterInputNumber(e, e.target.value)
    props.inputGasPriceHandler(e.target.value)
  }

  function tooltipGasSuggest(time) {
    return props.translate("transaction.transaction_time", { time: time })
  }
 
  var caption = props.maxGasPrice ?
    props.translate("transaction.transaction_gasprice_50") || "Higher gas price, faster transaction. Max gas price: 50 Gwei" :
    props.translate("transaction.transaction_gasprice") || "Higher gas price, faster transaction"
  var gasPriceSuggest = props.gasPriceSuggest
  return (
    <div className="gas-config">
      <div>
        <span className="sub_title">GAS PRICE (inclusive in the rate)</span>
      </div>
      <div className={!props.gasPriceError ? "" : "error"}>
        <div className="row">
          <div className="column small-7">
            <input type="text" min="0" max="99" className="gas-price-input" step="0.1" value={props.gasPrice} onChange={handleChangeGasPrice} maxLength="20" autoComplete="off" />
          </div>
          <div className="column small-5">
          <GasOption gasOptions={gas_option} focus={props.selectedGas} onChange={specifyGasPrice}/>
          </div>
        </div>
        {props.gasPriceError && <div class="error-text mb-1">{props.translate(props.gasPriceError, { maxGas: props.maxGasPrice })}</div>}
        <div className="des-down">Higher gas price, faster transaction. Max gas price: 50 Gwei</div>
      </div>
      
      <div className="transaction-fee">
        <div className="title-fee">Transaction fee</div>
        <div className="font-w-b">{props.totalGas} ETH</div>
      </div>
    </div>
  )
}
export default GasConfig