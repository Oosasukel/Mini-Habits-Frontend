import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
`;

export const Text = styled.h2`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: 4rem;

  @media (min-width: ${({ theme }) => theme.sizes.mobile}) {
    margin-bottom: 6rem;
  }
`;
