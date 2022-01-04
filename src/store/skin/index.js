/*!
 *
 * @module	: skinState generate by QuickDev Tools 
 * @createDate	: 2021-12-23 16:43
 * @auhtor	: lanbery<lanbery@gmail.com>
 * @description	: 
 *
 * @license ISC
 * 
 */
import { UPD_SKIN_STATE_BY_PROPS } from './skin-actions'

// you should add skinState into root store file,usally at src/store/reducers.js
export default function reduceSkin(state = {}, { type, val }) {
  const skinState = {
    // xxx: '',
    ...state,
  }

  switch (type) {
    case UPD_SKIN_STATE_BY_PROPS: 
      return { ...skinState, ...val }
    default: 
      return skinState
  }
}
