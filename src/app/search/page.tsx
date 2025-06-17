'use client';

import {
  type ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import suggestions from './mock.json';
import styles from './page.module.css'
import { useClickAwayListener } from "@/_hooks";



export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const queryName = searchParams.get('queryName') || '';

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [currentKeyDownedIndex, setCurrentKeyDownedIndex] = useState<number>(-1);
  const searchFormRef= useRef<HTMLDivElement>(null);

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useClickAwayListener(searchFormRef, useCallback(function () {
    setShowSuggestions(false);
  }, []))

  const handleQueryNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentKeyDownedIndex(-1);
    setSelectedSuggestionIndex(-1);
    setShowSuggestions(true)

    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set('queryName', value);
    else params.delete('queryName');

    replace(`${pathname}?${params.toString()}`);
  }

  const suggestedCountries = useMemo(() => {
    if (queryName) return suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(queryName.toLowerCase()));
    return []
  }, [queryName])

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Enter':
        if (currentKeyDownedIndex === -1) return;
        else  {
          setSelectedSuggestionIndex(currentKeyDownedIndex);
          const params = new URLSearchParams(searchParams);
          params.set('queryName', suggestedCountries[currentKeyDownedIndex].name);
          replace(`${pathname}?${params.toString()}`);
          setShowSuggestions(false);
        }
        break;
      // case 'Escape':
      //   setCurrentKeyDownedIndex(-1);
      //   break;
      case 'ArrowUp':
        if (currentKeyDownedIndex === 0) setCurrentKeyDownedIndex(suggestedCountries.length - 1);
        else setCurrentKeyDownedIndex((prev) => prev - 1);
        break;
      case 'ArrowDown':
        if (currentKeyDownedIndex < suggestedCountries.length - 1) setCurrentKeyDownedIndex((prev) => prev + 1)
        else setCurrentKeyDownedIndex(0);
        break;
    }
  }

  return (
    <main>
      <div
        ref={searchFormRef}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div onKeyDown={handleKeyDown}>
            <div>
              <label htmlFor="name-based">Enter name</label>
              <input
                name="queryName" id="name-based" type="text" placeholder="Enter name"
                required
                onChange={handleQueryNameChange}
                autoComplete="off"
                value={queryName}
              />
            </div>
            <div className={styles.suggestionsContainer}>
              {showSuggestions && suggestedCountries.map((suggestion, index) => {
                const isActive = currentKeyDownedIndex === index;
                return (
                  <button
                    key={suggestion.code} className={`btn btn-${isActive ? 'primary' : 'default'}`} onClick={() => {
                      setSelectedSuggestionIndex(index)
                    }}
                  >
                    <div>{suggestion.name}</div>
                  </button>
                )
              })}
            </div>
            {selectedSuggestionIndex !== -1 && (
              <div>
                  Searching details for {queryName}
              </div>
            )}
          </div>
        </form>
      </div>

    </main>
  )
}