/*!
 * FilePath     : date-formater.js
 * 2020-02-15 20:23:04
 * Description  : Extension devtools v0.1.0
 * 		 This file is implement
 *
 * Copyright 2019-2021 Lamborui
 *
 */
import dayjs from 'dayjs';

export function currentLogDateTime() {
  return dayjs().format('YYYY-MM-DDTHH:mm:ss SSS');
}
