// To test a React component, you need to install these modules:
// yarn add --dev react-test-renderer @types/react-test-renderer
// @see https://jestjs.io/docs/en/snapshot-testing
//
// If a test failed just because you intended to improve the component,
// just call `jest --updateSnapshot`.

import React from 'react';
import Renderer from 'react-test-renderer'
import InputView, { IInputViewProps } from './input-view'

function view(partialProps: Partial<IInputViewProps>) {
    const props: IInputViewProps = {
        // @TODO Set default props.
        ...partialProps
    }
    return Renderer.create(<InputView {...props} />).toJSON()
}

describe('<InputView/> in view', () => {
    it('should be consistent with previous snapshot', () => {
        expect(view({})).toMatchSnapshot()
    })
})
