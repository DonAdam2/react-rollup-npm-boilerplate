import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders the specified children text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with the specified color and background color', () => {
    render(
      <Button color="red" backgroundColor="blue">
        Styled Button
      </Button>
    );
    const styledButton = screen.getByText('Styled Button');
    expect(styledButton).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      backgroundColor: 'rgb(0, 0, 255)',
    });
  });

  it('handles the onClick event', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clickable Button</Button>);
    fireEvent.click(screen.getByText('Clickable Button'));
    expect(onClick).toHaveBeenCalled();
  });
});
