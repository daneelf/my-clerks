import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

let container;
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const dom = new JSDOM(html);

describe('index.html', () => {
  it('renders a select element', () => {
    container = container = dom.window.document.body;
    expect(container.querySelector('select')).not.toBeNull();
    expect(getByText(container, 'Choose your theme!')).toBeInTheDocument();
  });

  it('renders a list', () => {
    container = container = dom.window.document.body;
    expect(container.querySelector('ul')).toBeInTheDocument();
  });
});
