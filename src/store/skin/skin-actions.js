/*!
 *
 * @module	: Actions file generate by QuickDev Tools 
 * @createDate	: 2021-12-23 16:43
 * @auhtor	: lanbery<lanbery@gmail.com>
 * @description	: 
 *
 * @license ISC
 * 
 */
// Action types defined here or defined in global file: store/core-action-types.js
export const UPD_SKIN_STATE_BY_PROPS = 'skin@props/update_state'

// This action generate by QuickDev Tools
export const updateSkinStateByProps = (skinState) => ({
  type: UPD_SKIN_STATE_BY_PROPS,
  val: skinState || {},
})
