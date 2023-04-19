import classNames from 'classnames';

export function buttonStyles(design: string | null, mode?: string) {
    return classNames('button',
        {
            [`button--${design}`]: design,
            [`button--${mode}`]: mode
        });
}
