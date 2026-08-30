import type { Dispatch } from 'react';
import { BarChart3, Check, Layers, PanelRightOpen } from 'lucide-react';
import type { CoreToolIdType, OnboardingActionType, OnboardingStateType } from '../../types';
import { Badge, Button, Card, IconTile } from '../shared/ui';
import styles from './Step2RevenueFoundation.module.css';

const CORE_ICONS: Record<CoreToolIdType, typeof PanelRightOpen> = {
  'cart-drawer': PanelRightOpen,
  fbt: Layers,
  analytics: BarChart3,
};

export type Step2RevenueFoundationPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step2RevenueFoundation({
  state,
  dispatch,
}: Step2RevenueFoundationPropsType) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.checkBadge}>
          <Check style={{ height: '1.25rem', width: '1.25rem' }} strokeWidth={2.5} />
        </span>
        <h1 className={styles.title}>
          Your revenue foundation is ready
        </h1>
        <p className={styles.subtitle}>
          We&rsquo;ve already configured the essentials — nothing to set up, nothing to break.
        </p>
      </div>

      <div className={styles.toolList}>
        {state.coreTools.map((tool, i) => {
          const Icon = CORE_ICONS[tool.id];
          return (
            <Card
              key={tool.id}
              className={styles.toolCard}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <IconTile icon={<Icon style={{ height: '1.25rem', width: '1.25rem' }} />} />
              <div className={styles.toolInfo}>
                <p className={styles.toolName}>{tool.name}</p>
                <p className={styles.toolDescription}>{tool.description}</p>
              </div>
              <Badge tone="green">Active</Badge>
            </Card>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Button className={styles.continueButton} onClick={() => dispatch({ type: 'GO_NEXT' })}>
          Continue
        </Button>
        <p className={styles.footnote}>Fully customizable anytime from the Hub.</p>
      </div>
    </div>
  );
}
