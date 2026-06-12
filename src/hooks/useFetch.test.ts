
import { vi } from 'vitest'
import useFetch from './useFetch'
import { renderHook, waitFor } from '@testing-library/react'

const mockData = [
    { id: 1, name: "Toto" },
    { id: 2, name: "Tata" },
];

describe('useFetch', () => {
  
  let fetchMock: any;

  beforeEach(() => {
    vi.restoreAllMocks();
    fetchMock = vi.spyOn(globalThis, 'fetch')
    fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockData
    } as Response);
  })

  it('récupère les données avec succès', async () => {
 
    const { result } = renderHook(() => useFetch("http://api.company.com/users"))

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData);

  });


  it('permet de relancer la requête avec refetch', async () => {
 
    const { result } = renderHook(() => useFetch("http://api.company.com/users"))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)

    await result.current.refetch();

    expect(fetchMock).toHaveBeenCalledTimes(2)
  });  
})