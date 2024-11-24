import { render, screen } from '@testing-library/vue';
import HelloWorld from '../components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders the HelloWorld component', () => {
    render(HelloWorld);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
