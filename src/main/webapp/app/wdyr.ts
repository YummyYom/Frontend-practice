// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
  trackAllPureComponents: true,
});
