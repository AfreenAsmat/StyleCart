import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearch } from '../../contexts/SearchContext'
import { useNavigate } from 'react-router-dom';
import search from '../../assets/search.png'
import { products } from '../../data/productsData';

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  },[ref, handler]);
}

const optimizedProducts = products.map(p => ({
  ...p,
  lowerName: p.name.toLowerCase(),
}))

function SearchBar({autoFocus}) {
    const {searchQuery, setSearchQuery} = useSearch()
    const [query, setQuery] = useState(searchQuery || "");
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showList, setShowList] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    useOutsideClick(wrapperRef, () => {
      setShowList(false);
      setActiveIndex(-1);
    });

    useEffect(() => {
      const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300); 
        return() => clearTimeout(t);
      }, [query]);

      const suggestions = useMemo(() => {
        if (!debouncedQuery) return [];
        return optimizedProducts
        .filter(p => p.lowerName.includes(debouncedQuery))
        .slice(0, 6);
    }, [debouncedQuery]);

    useEffect(() => {
      setShowList(suggestions.length > 0);
      setActiveIndex(-1);
    }, [suggestions]);

    const handleSubmit = (e) => {
      e?.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      setSearchQuery(trimmed);
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setShowList(false);
    };

    const handleKeyDown = (e) => {
      if (!showList || suggestions.length === 0) {
        if (e.key === "Enter") handleSubmit(e);
        return;
      }

      if (e.key === "ArrowDown"){
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length -1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i-1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0) {
          selectSuggestion(suggestions[activeIndex]);
        } else {
          handleSubmit(e);
        }
      } else if (e.key === "Escape") {
        setShowList(false);
        setActiveIndex(-1);
      }
    };

    const selectSuggestion = (product) => {
      navigate(`/products/${product.id}`);
      setQuery(product.name);
      setSearchQuery(product.name);
      setShowList(false);
      setActiveIndex(-1);
    };

   
  return (
    <div ref={wrapperRef} className='relative w-full'>
    <form onSubmit={handleSubmit}
    className='flex items-center w-full bg-offwhite border border-gray-400 rounded-full px-2 py-1 shadow-sm '>
      <input 
      ref={inputRef}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        if (suggestions.length > 0) setShowList(true);
      }}
      placeholder='Search...'
      className='flex-grow bg-transparent border-none outline-none px-2 py-1 text-gray-700 placeholder-gray-400'
      autoFocus={autoFocus}
      aria-autocomplete='list'
      aria-controls='search-suggestions'
      aria-activedescendant={activeIndex >= 0 ? `sugg-${activeIndex}` : undefined} 
      role='combobox'/>
      <button 
        type='submit'
        className='flex items-center justify-center w-8 h-8 '
        >
           <img src={search} alt="Search" className='w-4 h-4 sm:h-5 sm:w-5 invert' />
        </button>
    </form>

    {showList && suggestions.length > 0 && (
      <ul
      id='search-suggestions'
      role='listbox'
      className='absolute z-50 mt-2 w-full max-h-72 overflow-auto bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border border-gray-200 rounded-lg shadow-lg'>
        {suggestions.map((p, idx) => {
          const isActive = idx === activeIndex;
          return (
            <li
            id={`sugg-${idx}`}
            key={p.id}
            role='option'
            aria-selected={isActive}
            onMouseDown={(e) => {
              e.preventDefault();
              selectSuggestion(p);
            }}
            onMouseEnter={() => setActiveIndex(idx)}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
              isActive ? "bg-gray-100" : ""
            }`}>
              <img 
              loading='lazy'
              decoding='async'
              src={`/${Array.isArray(p.images) ? p.images[0] : p.image}`} 
              alt={p.name} 
              className='w-10 h-10 ' 
              />
              <div className='flex-1 min-w-0'>
                <div className='text-sm font-medium truncate'>{p.name}</div>
                {p.category && <div className='text-xs text-gray-500 truncate'>{p.category}</div>}
              </div>
            </li>
          )
        })}
      </ul>
    )}
    </div>
  )
}

export default React.memo(SearchBar);
