import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/CodeBlock/Line';

import styles from './styles.module.css';

export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): ReactNode {
  if (line.length === 1 && line[0]!.content === '\n') {
    line[0]!.content = '';
  }

  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });

  const lineTokens = line.map((token, key) => (
    <span key={key} {...getTokenProps({token})} dir="ltr" />
  ));

  return (
    <span {...lineProps} dir="ltr" style={{display:'block', direction:'ltr', textAlign:'left', unicodeBidi:'isolate'}}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent} dir="ltr">{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
