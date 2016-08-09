import ExpanderSimple    from 'components/ExpanderSimple/ExpanderSimple';
import ExpanderField     from 'components/ExpanderField/ExpanderField';
import ExpanderVertical  from 'components/ExpanderVertical/ExpanderVertical';
import ExpanderAccordion from 'components/ExpanderAccordion/ExpanderAccordion';
import Demo              from 'components/Demo/Demo';
import DemoComponent     from 'components/Demo/DemoComponent';
import DemoCode          from 'components/Demo/DemoCode';
import Code              from 'components/Code/Code';
import CodeBlock         from 'components/Code/CodeBlock';

import React             from 'react';


export default class ExpanderDemo extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    onlyOne:  React.PropTypes.bool,
  };

  static defaultProps = {
    onlyOne: false,
  };

  state = {
    expanded: {
      simple: false,
      field:  {
        error: false,
        other: false,
      },
      vertical:  false,
      accordion: {
        mars:    false,
        earth:   false,
        venus:   false,
        mercury: false,
      },
    },
    expandedChanged: null,
  };

  listeners = {
    changeExpanded: {
      simple:    this.changeExpanded.bind(this, 'simple'),
      field:     this.changeExpanded.bind(this, 'field'),
      vertical:  this.changeExpanded.bind(this, 'vertical'),
      accordion: this.changeExpanded.bind(this, 'accordion'),
    },
  };

  changeExpanded(name, value) {
    const expanded = { ...this.state.expanded };
    const expandedChanged = [];
    if (name === 'field' || name === 'accordion') {
      Object.keys(value).forEach(key => {
        if (expanded[name][key] !== value[key]) expandedChanged.push(`${name}.${key}`);
        expanded[name][key] = value[key];
      }, this);
    } else {
      expanded[name] = value;
      expandedChanged.push(name);
    }

    this.setState({ expanded, expandedChanged });

    setTimeout(() => {
      this.setState({ expandedChanged: null });
    }, 500);
  }

  render() {
    const onlyOne = this.props.onlyOne;
    const expandedChanged = this.state.expandedChanged || [];

    return (
      <div>
        <Demo key = "simple">
          <DemoComponent>
            <ExpanderSimple handleChangeExpanded = { this.listeners.changeExpanded.simple } />
          </DemoComponent>
          <DemoCode>
            <Code>
              <CodeBlock>
                {
`<div className="title" onClick={toggle}>
  <span>I Got You</span>
</div>`
                }
              </CodeBlock>
              <CodeBlock
                highlight
                blink
                blinkActive = { expandedChanged.indexOf('simple') !== -1 }
              >
                {
`<AnimakitExpander
  expanded={${this.state.expanded.simple}}
  durationPerPx={3}
>`
                }
              </CodeBlock>
              <CodeBlock>
                { '  <article>...</article>' }
              </CodeBlock>
              <CodeBlock
                highlight
              >
                { '</AnimakitExpander>' }
              </CodeBlock>
            </Code>
          </DemoCode>
        </Demo>

        { !onlyOne && <Demo key = "field">
          <DemoComponent>
            <ExpanderField handleChangeExpanded = { this.listeners.changeExpanded.field } />
          </DemoComponent>
          <DemoCode>
            <Code>
              <CodeBlock>
                {
`<div className="field">
  <input onKeyUp={validate} />`
                }
              </CodeBlock>
              <CodeBlock
                highlight
                blink
                blinkActive = { expandedChanged.indexOf('field.error') !== -1 }
              >
                { `  <AnimakitExpander expanded={${this.state.expanded.field.error}}>` }
              </CodeBlock>
              <CodeBlock>
                { '    <div>Sorry, ... </div>' }
              </CodeBlock>
              <CodeBlock
                highlight
              >
                { '  </AnimakitExpander>' }
              </CodeBlock>
              <CodeBlock>
                {
`</div>
<div className="field">
  <input type="radio" ... /> No
  <input type="radio" ... /> Yes
`
                }
              </CodeBlock>
              <CodeBlock
                highlight
                blink
                blinkActive = { expandedChanged.indexOf('field.other') !== -1 }
              >
                { `  <AnimakitExpander expanded={${this.state.expanded.field.other}} align="bottom">` }
              </CodeBlock>
              <CodeBlock>
                { '    <textarea ... />' }
              </CodeBlock>
              <CodeBlock
                highlight
              >
                { '  </AnimakitExpander>' }
              </CodeBlock>
              <CodeBlock>
                { '</div>' }
              </CodeBlock>
            </Code>
          </DemoCode>
        </Demo> }

        { !onlyOne && <Demo key = "vertical">
          <DemoComponent>
            <ExpanderVertical handleChangeExpanded = { this.listeners.changeExpanded.vertical } />
          </DemoComponent>
          <DemoCode>
            <Code>
              <CodeBlock>
                {
`<header onClick={toggle}>
  Contact Us
</header>
<main>`
                }
              </CodeBlock>
              <CodeBlock
                highlight
                blink
                blinkActive = { expandedChanged.indexOf('vertical') !== -1 }
              >
                {
`  <AnimakitExpander
    expanded={${this.state.expanded.vertical}}
    horizontal
    align="right"
  >`
                }
              </CodeBlock>
              <CodeBlock>
                {
`    <form>
    ...
    </form>`
                }
              </CodeBlock>
              <CodeBlock
                highlight
              >
                { '  </AnimakitExpander>' }
              </CodeBlock>
              <CodeBlock>
                { '</main>' }
              </CodeBlock>
            </Code>
          </DemoCode>
        </Demo> }

        { !onlyOne && <Demo key = "accordion">
          <DemoComponent>
            <ExpanderAccordion handleChangeExpanded = { this.listeners.changeExpanded.accordion } />
          </DemoComponent>
          <DemoCode>
            <Code>
            { Object.keys(this.state.expanded.accordion).map(item => {
              const active = expandedChanged.indexOf(`accordion.${item}`) !== -1;
              return (
                <div key = { item }>
                  <CodeBlock>
                    {
`<div onClick={toggle}>
  ${item.charAt(0).toUpperCase() + item.slice(1)}
</div>`
                    }
                  </CodeBlock>
                  <CodeBlock
                    highlight
                    blink
                    blinkActive = { active }
                  >
                    { `<AnimakitExpander expanded={${this.state.expanded.accordion[item]}}>` }
                  </CodeBlock>
                  <CodeBlock>
                    { '  <image ... />' }
                  </CodeBlock>
                  <CodeBlock
                    highlight
                  >
                    { '</AnimakitExpander>' }
                  </CodeBlock>
                </div>
              );
            })}
            </Code>
          </DemoCode>
        </Demo> }

      </div>
    );
  }
}