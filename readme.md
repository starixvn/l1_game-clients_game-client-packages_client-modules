# Client Modules

## Installation

- Using npm

```bash
npm install @nex3/client-modules
```

- Using yarn

```bash
yarn add @nex3/client-modules
```

## Initialization

At the application starting point, add the following code

- Using `typescript` or `ES module`

```typescript
import * as modules from "@nex3/client-modules";

window.modules = modules;
```

- Using `CommonJS`

```javascript
const modules = require("@nex3/client-modules");

window.modules = modules;
```

## Example

- Using `modules.mobxCocos`

```typescript
import { state } from "/path/to/state/definition";

const { ccclass, property } = cc._decorator;
const { observer, render } = modules.mobxCocos;

@ccclass
@observer
export class RoundIdComponent extends cc.Component {
  @property(cc.Label)
  protected roundIdLabel: cc.Label = null;

  @render
  protected renderRoundId() {
    const roundId = state.roundIdLabel;

    this.label.string = roundId;
  }
}
```

- Using `modules.mobx`

```typescript
const { makeAutoObservable } = modules.mobx;

class RoundIdState {
  constructor() {
    makeAutoObservable(this);
  }

  public roundId: number;

  public get roundIdLabel() {
    return `#${this.roundId}`;
  }
}
```
