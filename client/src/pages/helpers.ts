/**
 * dispatchIfChanged is a helper function that checks the current and next 
 * params for changes to a key and dispatches an action if changed.
 * 
 * Usage:
 * 
 * ```typescript 
 * public componentWillReceiveProps(nextProps: IProps) {
 *   dispatchIfChanged(nextProps, this.props, 'country',
 *     this.props.loadCountry, this.props.loading);
 * }
 * ```
 * 
 * @param next Next Props
 * @param last Last Props (this.props)
 * @param key The param key. eg: 'country', 'year', etc.
 * @param dispatch The action to dispatch if param is changed and there is no 
 * existing entity.
 * @param loading Optional loading flag to prevent double requests.
 */
export function dispatchIfChanged(next: any, last: any, key: string, dispatch: any, loading = false) {
  const nextParam = next.match.params[key];
  const lastParam = last.match.params[key];

  const paramChanged = nextParam !== lastParam;

  const existing = last.entities[nextParam];

  if (!existing && paramChanged && !loading) {
    dispatch(nextParam);
  }
}