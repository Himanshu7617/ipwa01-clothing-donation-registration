import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { MemoryRouter, useParams } from 'react-router-dom';
import DonationSubPages from '../../models/DonationSubPages';
import DonationView from './DonationView';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('DonationView', () => {
  const useTranslationMock = useTranslation as jest.Mock;
  const useParamsSpy = useParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationMock.mockReturnValue({
      t: jest.fn((str, option?: { returnObjects: boolean }) => {
        return option?.returnObjects ? new Array(str) : str;
      }),
      i18n: {
        language: 'en',
      },
    });
  });

  test('should render the overview sub page correctly', () => {
    useParamsSpy.mockReturnValue({
      subview: DonationSubPages.Overview,
    });
    render(<DonationView />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Joy Exchange - overviewPage');
    expect(screen.getByTestId('overview-row')).toBeInTheDocument();
    expect(screen.queryByTestId('donation-row')).not.toBeInTheDocument();
  });

  test('should render the donation sub page from home correctly', () => {
    useParamsSpy.mockReturnValue({
      subview: DonationSubPages.FromHome,
    });
    render(<DonationView />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Joy Exchange - homeDonation');
    expect(screen.getByTestId('donation-row')).toBeInTheDocument();
    expect(screen.queryByTestId('overview-row')).not.toBeInTheDocument();
  });

  test('should render the donation sub page local store correctly', () => {
    useParamsSpy.mockReturnValue({
      subview: DonationSubPages.Local,
    });
    render(<DonationView />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Joy exchange - localStoreDonation');
    expect(screen.getByTestId('donation-row')).toBeInTheDocument();
    expect(screen.queryByTestId('overview-row')).not.toBeInTheDocument();
  });

  test('should not render sub pages on unknown parameter', () => {
    useParamsSpy.mockReturnValue({
      subview: 'wrong-param',
    });
    render(<DonationView />, { wrapper: MemoryRouter });

    expect(document.title).toBe('Joy Exchange -');
    expect(screen.queryByTestId('overview-row')).not.toBeInTheDocument();
    expect(screen.queryByTestId('donation-row')).not.toBeInTheDocument();
  });
});
