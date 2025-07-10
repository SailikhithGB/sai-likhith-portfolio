import { Button } from '@/components/ui/button';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden hero-bg" style={{ margin: '30px' }}>
      {/* Floating background elements */}
      <div className="floating-icon top-20 left-10 text-6xl">⚛️</div>
      <div className="floating-icon top-40 right-20 text-4xl" style={{
        animationDelay: '2s'
      }}>🐍</div>
      <div className="floating-icon bottom-40 left-20 text-5xl" style={{
        animationDelay: '4s'
      }}>⚡</div>
      <div className="floating-icon bottom-20 right-10 text-3xl" style={{
        animationDelay: '1s'
      }}>🚀</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Profile Avatar with Holographic Effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition-all duration-300"></div>
            
            {/* Main avatar container */}
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-cyber-blue via-cyber-green to-cyber-purple p-1 animate-glow-pulse">
              <div className="w-full h-full rounded-full bg-cyber-dark p-1 relative overflow-hidden">
                {/* Profile Image */}
                <img 
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxALChAQCBAJCAgJCAoICAkJCBsICQcKIB0iIiAdHx8kKDQsJCYxJx8fLTItMT03QzpEIys/TTMsNygtLisBCgoKDg0NFQ0NFSsZFRkrKzcrKys3Ky0tKy03KystKzctLTcrKysrLSstKysrKysrKysrKy0rKysrKysrKysrLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUBBwj/xABBEAABBAEDAgQDBQUGBAcBAAABAAIDEQQFEiExQQYTIlEyYXEHFEKBkSNSYnKxFTNDoaLBJDSy4SU1RFNjdIIW/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQAAQIFBv/EACcRAAICAgICAQMFAQAAAAAAAAABAhEDIRIxBEETIlFhBRQycYFC/9oADAMBAAIRAxEAPwD3FJRNlaRYII+q594b7j9VCrJSmOYD1URn545U92FROxMCcuBdVliSSTHOrqqbIcf05/JNYFFLktA6qD7+B8NXaxyRfFv0X+PkoZpQ1U35ZPRRPcS037KnJejccbb2Ok1ljDRq791h+I85s0fo60qWTjmXI46BX/7MG31cmlj5GmMft1W2ef5UBLiu4bCHiweCibNwAx/A4tWYNGa5oNUtLP8AcxLxFVphJ4YcPIF0DXuptbm2s9Jo/VYuPDJCKYTQUWWJZOtqpZLWgbwOqTLOlZDjJybFooY9BMDZIjYvqtSLU3jr1UWTWzPwSQTD/ddWEzWSOoUo1po+Pj81tTRHjkvRsJLNZq7COP6qN2qt9/8ANa5Iy4tejSkmDep6pIUzNRMktNNC+ElOSM7KOn6o8wkkmwPdUI9cf5hsmg+gqmO2RkdUeVXixX7iSDy60S1YNqVHouiT+azcewWjkZPlhDHh3LLRtPBW5m0Wes1wsOjUXrZaxMrzeitWsLEzY4RyQrcOpB/w9FnlXZuKbdI0rVHLcQU8ZYVXNyARx1pZlJNaNqDtaM7Lk6qDHdzylkm/15Tcb4ku3sd4riaLOU6Z1MP0UbTS5kO9B+itPRlRVopYYuQ+6vELNw5mhx3GjSvidp7hZDNMqZ7Aav8Aqp8Qfswq+dIDVEdFZx3DYFERq0T0uUlY+SQKhniKh3/om+WD2CcSuqWVxITC09lmahBbqZwtclUX8y/moWls5jYNN5PNKjmQOa7g8Fbo6KlmjkWpZONvZXgwNzQT1SWjjimD6LqvmzDhE6cBt9Ex+G0dgpxlUenKe99j2V8mBcUV8bEDHWOAua5ORH6eOFK+ThZmsSW38kRO0BnFWYbpHdyeVuaO/wBPPssNa2mmgqlLVBMapmw96ryS/ms3Vs10fwflSghzS6Ik9aQ3F9h003RZycoWbofmq39qtj6nlDefqLt5HsVUD3SFWol36CyTxAOx+qqza6XCgeCsRmOSn/dSApSRZYdqJuwatObqbx0PCqHHTm45IsBxANGhwCqqzSnS2y0/U3O79FLHrLmjqeFnGH5EfXhNMRCpqi1M1xrzh37qRniE91guYueWolZbn+Amb4h91I3xEO6Fdh7Lmz6qURy/AYDxA2uf6qFmss32SOtoSksdLUDXG6tTiTl+D0Ea7H7hRT6rG9wII/VA9ur+iaXPHcq+Jjmluj0WLVI9o5HT3SXnnmu9ykpwK5r7Hox1mAnqB+alOrwuFNI/VAjsB/8AEpMfCkB43cJt40c75HQa+aH/AAnqodSwnOZYsilhafkvbLTr490W4WewjbJRsVyh8UnRtybSYJ1tNO4IVvHyhHQWhrmG2t0NEHmwhuUc37HlZkguN2zU1SQOivqKtZGDm2S334paDDvho88Uh+VphmvoCVVaoJLTTRzVoaffa7XcECuVoZMfmxWOTSoQtrrxyotqjXuzSbMxotxawDqSapUZ9Xjs7BbRwXvOxqydazREwg+o36W/vFBudrDiSHUTfDQPhRceG9sWyeQ1pBtl+Io4bLCyagCGg0smTxs8uO0bBY9IG2kGyZ5rkAnv7KNs4efWABXZMxglqhVzb7Z6Fh+Lw5xE7WP7gkfEtqDLjlotLRYsi/hXkoeWXXwkWx3stbRtaMTqkLvLc5pd7rM8UZIuGacX2ekGu1Ee65YvhVsGdkjbYdzTy2xXCm2+oduUlLG4s6GPLzaSJfL7qJ7gFeIAj+dLOlbZJWF+Rt4pvpEcrgVWI7t6qUMU8EF/NU/wU4OOpIoMkO71dFoMDC0X1UeRjU72ViDALh1RYR5C2TIodojcGdElKNMJd1NLq38T+4L9yvsHhwGDsFwwRs67QqGu6k7HYPLFOeS0OrgIf/tWR39461tZL2hf42tMv58BjyN0Y3M620WnOJPIthPNFZo1YtPB/wA1ZZrTHH9sAf4m8FZlt2jai6o2MV5fEWvNkLImgO410taODkxPd+zcBu/C40VfOK08iiSsyaCY00wfhtvXpaqavjWzcPdEM2LQ4Avqq0+KXxEV2WLSCtt6owcGW2UVSzpxE0noTwFYbjujkIo1axPFNxyR7/xBwYCaaTwtwSckjM21jb9g9rmeSaj9cnfvsQzONp9fMh5PNhi09VyhuIh2kk29w/EVig3z1JPN909Gkc1u9jhz8gntaL6pD0jjqeSSmh36lX1spD5DVgdOvXdSja5ccefa0m0Tz/koaCHQsr1C3+WQPT7ko10jKc9hEpLnsPDj+ILz3Cx6IdHTyObD+iLtByHPm2kV+yNlp3NKBnj9NnQ/TWvmSa0wm80n6Jjhaa1p+akawkrn6PWSjFdEBFdVdwG7nKvIzngLZ0bAcTZBA+atJvo4/lzXLbIcrD3fCoGl0Q56IqfA0daWdn4Y2HZRRIqUTnZJRlozIcoFvPVJQxYxur47JI/yCvxfgJvE+OH4bndDERICvNM7Ug0Gj0+a9bzYPOgex3HmRuYfrS+f9dhlxMmSOSy1kjmn95htL4XaoYyR3Zdl1gg8FJurE9+aQ06ez1v68UpI5vzTHGjCkgrg1Zw7n5Ig0vxW+MgPO5ns42vP4pldjlWWrCKj2HTvEUM4AeRG49QfhWwXMdHcZaRXYrxPGyi08Ej6FEWm66+IDkkdx7oUoL0aVoL5WguPAu0BfaM/9pE1nxtjdY9rRXiaxHOefQ/vzYQh4+wJ5X+ZjNM0OwBz2G3BaxKpJsmZp46S2BWW1gAEfLz8bqoLPkq+OGjgfxLryQSHWHDgtPppMHKfT+xymmjrj+gTXH8vZIpEfoFZDjj7rh4+iTinM+fuqLLWFkFjh3bfPKNvAcTp8ubYC6NkIsn8LkCEbSK5HWr6r1T7HwHR5PH44qJHZAzuoMY8afGaa9BB9wPsutwHbqaCST7LdysyKHiRzGG6AJ5tYupa2GAiKgD3B+JIwje2dV+VkassCKLG5m2ySj8N+lirZHiHmmU1vQAcIUz9VLibN/msifUufn9UW0uhSXKbtsORrd/EU9+fvHocb+q83fqhvqVo6PqjnysZ8RfI1g+tqOejHCj0iLCcWg0LItJa0MZDBf7o7pJZzZtTYDP+13Ho7YMsn50hDX/EkGr5O6OJ+HM5tEyODhMUI4+I+V1Qh8hutrTucrbNByibZDkEg2HBhG1dHjBdaYqpzfex+Vh07oqboCDxY+hRRFhSmAHLjkikYdri5tBypS6eXPDWfE51BD5bDqKqy34Z02HLGybzA/s9jqLVr674OnwYfOxz96w2tDpHt5fB9V3SMI4rf2XWr3H8Z7q9D41eJDDAWOgFjLfI3e17fYBWk5PQOWSnSA6HIHUG/oVdblcUOqZmadFn5JOitlxMiSZzRC8bcad/ej2+i1IfAuohlvYzgWXeYA0qppR7YTHkcvQzAygxtNJLnO5Nrexs/wBG0m/kUHiKWCSslrozdA16StSGc9UJr2HTssat4fizGlwDYpq4ewbT+aDsvwzPE79mGZDezmuqvqi6TMfsIi617LKgkmmm2A8uvkuprQrjklHoxLApbBWbBljdUjHD6cqb+yZjGH7Q1hFguPZbeoQujeN7mu9PHNqAue1vxWzrsv0oyytoEvHinsxv7Ok/gJHa6UrNKnd8DN/PY2tMtkcbiEWyuQT6iVaimfFVsINVYdbVTzNdG/28GcwvCcn3czZJZG6MNkbARv8ANHdGOh63EMW9Oa3HliaDJExoZ5iwI9Tf5RDySHCuViaTnjHzXF52QyNcH8XtQpylKLrsxLGoNV0Hmpaz96x7oOjkbTx3YUN4uc7a+OZxeYHVG5x9Rj7Kji53MjY3OfCZHOYXDaSm6ZU+cWvIjjeWxukcdtKknQziknHbJsiez1WXPmNB9Rs9wOUVazpDWRkYm664dJ6vMCD24ZDjvFG+bHQqJJPYNy5dDRkF59DSfm40iXwZA0ZYkyJIIvJ9UbJZRHvd+aw3sEMZdV0OK/EUPzTSPfbi/rY9moigpf0ClLj3tn0Q3VXOFRGOT+SYP/3SXzu3NlZ8D5Wn5SFqSnwRMrM/sezfZfpsUcuYdrTJHnyQsLhZZEEf5BDWmgBx7IJ8DOrJyK43Tucfm5FmU+2n6e6VySbfYzjjS0DequEhLXAFpFEIcZgmORxFGmlsbj2JWnqUhEpq1FiPt4DuRfKJCLorLkjxpLZh+IcgxNEUNb5MZz5Cw/DH2QvBII2sLuN0nmO/lW3nEHJmefS15dGwH91C2fKXSgN4DAGBPwSikc6TbYU4OvBj2B4DW7muxo2M3Oa7pZK9L0PX45Q+F0sb8lsRLYqI2il4fiO25jC7mngH6o+0nMAlr0stvWqLvzWcmNTCY8jh/RzxRJWnSub8QDS0/um1k4d+S13UOYC75FEOqwY+RjPjfJ93bIKdORubutZseGIcao5GzANbtcB6SgvG0g6zJysijFsPO01axmvka8mMOeAaLmt6LWlaPLN8GjRVCDVvLhMW0VucfMB5Qqa9DMWmrsq5k/myuLWSxN2t4eLpygY/cKcarsQpRO4Gy62kdb3BMknLjwQe/Rasr/SbENvDQdtmrVjNhMbmhr94eL/lVP701vDmku6E7aDVJC/zX03gA30Q93YRNVotSAhvJs0h6Ro88+wPPFojmx3CZkUofCZmOe17m1tb7qWfwsI4fMx5o8vIPLLcI2V7JjFH2xLyJpqkYELgNwO9jzQa2OPeXJuRQaW1IZGtstdJTmD3pXmZc8LSMf8AYZEQLpsZ8YLZ29ymYmpw5Ul5I8iYcONb2vcmOKFVJpFnw3rrt4gy3eZE+hFI425i3NW0wBoe3k7qP8QQTqEAgymuh5ie7c3iqK9G0933jCY53PJab/GQlM8a2hjBJ2kP0TCgjjqdscznUXeY3cGp8+k4RJpkYvsG/CoXREfDwqT2Ovq7qgxb6saycUraK+s6HieS4sAa4BxFcJKLWGEQGyT+aSKr+4u5x+wWeDuMucf/ACuRdOLB+iEfCH/OzA95HI0c3gpWfYzDSArU2VKVXxxTvktLVYrlNe6pxwm0xB6FpdsB/EcBiyRdlu/cPosM4+/Jf0AZOC75NR/4u04HD8x52PY9rGuPAcSgRnGdIx3+JGRVfipNQlaFmtlAy1kX2Em4fqjPEl2MMklbWNIZ/EUDyN/aG+zluNlLsXqfTF0tEToor63rTpyI4f2cANUP8QpkWrywlseK4MjjdyK4ld7lZ0fMlnijYH7yfDDv3EkAg2Bfq3KivZ6JBmQ+gyVJOW2Q000hUtRGI5pLwInu5DSNhQ7puW0UHcuaNoJNGlfyg2UDeGyANodnMWXjTQSGVxZRe5rQTQZFbiC02HtTcXID5NsI3OILr6cKpl4oFhheG3Za7naqsDHMfcbtjum4eyw8YZeQ20wq08EG5wHR2Q5vVxC24caCBolhA8xxvY47GsH1QpBkbGXZcTyXHq8qHUNZe9tNO1gNj5FSOJXbZWTO2qWkGGv65I14LIsTKikivaTUpb7IbD48tjvu7TjP/vBCyQuDT+83/cKi2QvjgMj/AFepp3urcLVFkhglcIyfMglLonAdR7IypaQu9mtj6tKXGOZsb54w5rZnC3bVlSkfeGuZ6Q9zS9vs61oU2eRk8dBznNEzPZyzpI/+LA6ftK/zVNkNDVRvljA7OK9P0DE8vCja4Udpeb+aBtDxRk6jGCLYHmR46t2heswMaGj6cBKZ5bSHPGj7ZkyYo9lRfieroeqJn7QOl/kqGQ8DoEFDGX6kCXiSDbB8yaXE/wATTkho9z0pJFTYm4G14VP/AB8v86NyLHKBfDBrUpP5iUdXwlp9oah0UJcEPdzXVWItKb7BTBW4SpGTJKK7Av7ScJrdHPv98xR/qQB9oOnDE1uF0Y2R5MMEgDRTSehXpP2n8aOT7ZmL/wBSyftR0n7xp+NkRjdLiSQBxA58o/8AdNY5VQtONnj+VCfvDgOm9wtaMTNrNvA3xv4907UGNilLn8uJJr2cqeDIZcm3dBG8AH4WtTQsZvwyfmpLLJPkSuZLaefcEhSStsBze7bUIzszS124cXzY7KbHziOHHrwD1tNZ6mUaNDlU5G7Tx0Uso08max8qpV4TymxP3s56jghdbx19uqhaJcmem10FdAs97rNdBakldfXomNZz7qFlvLBGOwj/AA5COF2eO3xvHSdrQ4/xdCpWs8zFcBy5oDgFJpdS45af72GZr2fyqFFbS5NhO7lrZA13yFqeSA/fd34S4yN9iFUgO6SUdnB7h83Wt7QsSTNdGyEbpZT5Lf4T3Kq6LSs3/s+gD8iV342hkQ/hCP8ALd5QFeyDvBGJ92fldSI812O0nr6Vv5ecHn3XO8jIlJnZ8LC5RTNOCQOjJPVVJKN1ZVCPNrgXR+a1cRzC23kA/VDx5FJ0b8nx3HfoC/EhqQUOQOElN4kmj+8cEEA0km0zmuOzT8PcarJ/MUdoE0PjVX+25HaXl6GIdCU8JUCfG5ZXZclaBz7UP/JXf/axT/qCImwNnxGsmAcyTGY1wI4IpDn2mOvRH118/F/6kUYH/Lx3/wCxF/RHT0hetngHjzDOJmmJw4a4kfxN7LO0JnqJdyAw2j77a8ACSCdnV0bo5AgDR8kBjmcbnd/km4O0hWcaZS1JlSH+ZxTsJwdHR6tPAKt6nDubbevQ0s3Hfsdz0K2ZLwpjT3ceKVORt9eFM9189QmPFjhQhWidtfz0PBViZ3A+iqyj9U/zNwF8EBUWhxH6JXX+6buTS61ZC7g5Gx/Pwk075hW8WHyZpC3mLynyNNXwspvHyWnglzopObIicBZ7KWQoaWLyQOpeXCvqvbfsq0IQYZypm295cyDcPhb3K8Y0SMuzYxXHnNv6WvfP/wCiZjYQZE1rWRwhjRfQIc8iT2EhinNNxXRgeHYfMxcmQcGTVsw1/DaheKJ97VbwxqLm4TmOob8meYj5kqw91m/dcrypJy0ei/ToyjjqSI3BZ2fnvj4Za0XFUsuNpFu9kLA6kgvl7gwOzsqSWXm73JKWRzRkV19SS6S6PPyWw/0k1qh/nRzu/wC6A9NNaof5yi3LzmxN5PKXn6Cw9l209pWJHqocevCtDPbXUc9Fh2jdozPtFk/8Fl9vMgP+pE+nSbseI+8EJ/yQb47ymv0eYWD8BH1tbem59YsXP/poe/yRU/pTMNbB77U9r3YzJPgfvafkDxa8eyYnYmQR3Y4g/wATV6T9peb50sAHXyXtafZ12hHOY3MgDm15u3/9Od7J7F/BCWbUjPjnLhfVpFEKCSIXY6d/dqrxl0L6I9N05qlkyAegsDoQUQwPHt2IUYfR55CY6YH3b+Sb5g7n9VG2T8ExiDx2FfNVZICCpQ72Ir5J4k555FKEoq7SnNHHKsOeD2/RMcB24VEQ1otaOmuI3Ac2yiFRbQ6kX9VYx3U4Fho9AR0Kpss2PCWmvl1AbWk7C5xocN+aPNYxXMgdYr0qr9mbQ2WZzwDtibGXV+I9lv8AjHMazFOwC6SuWKnJW+hzx87xRaq7B3w/iF0ZvgWtxuB7oR0XWyBQ7noimLKc9v1CXlhV7G4+a0kkSuxmt+JY2sPb5Z2dgtDK3Ec2sTOjqM2b4UWNJ6RifkTmnsD2MLsk/W0lpadCDP7cpIorsLceTbqZ/nKt6zOXOIBSSWH2g8FplLHkI7lWDkH34SSWJMPDHEyvFWTu02UXfpb/AFV/TdQJxowDZGPGOvyXUkT/AIX9karJ/gO+NZ7MLv3JGlDgcYp3NBoF3nQkH08pJJ3H/FHKz/zZHktEhJcNsnf91yoyRFvTiuoXEkUGMP0XHx30SSVFexmxc5+f6pJKGhbSev8AVTMjAbfU/VJJQtITWi+llW4/QA5/LrqNvu7skkqK9nsXg3STi6VGZP7/ACbypj3s9AqPi03DR78JJJGT+oZS+kH9J0kine/KL8aCmi+tJJKMyNywAOfZYmeAYnV7JJKIPD+Jn6Bg75Ta6kkrZF0f/9k="
                  alt="Sai Likhith GB - Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Holographic overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-transparent to-cyber-green/20 rounded-full mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/30 via-transparent to-transparent rounded-full mix-blend-overlay"></div>
                
                {/* Animated scanning lines */}
                <div className="absolute inset-0 opacity-30 rounded-full overflow-hidden">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-vertical"></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-cyber-green to-transparent animate-scan-horizontal"></div>
                </div>
                
                {/* Floating holographic particles */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyber-blue/80 rounded-full animate-float"></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-cyber-green/80 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-4 -right-4 w-2.5 h-2.5 bg-cyber-purple/80 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-4 -left-4 w-2 h-2 bg-cyber-blue/80 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
              </div>
            </div>
            
            {/* Orbiting tech icons */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-2xl">⚛️</div>
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 text-2xl">🐍</div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 text-2xl">⚡</div>
              <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 text-2xl">🚀</div>
            </div>
          </div>
        </div>

        {/* Animated Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-to-r from-cyber-blue/20 to-blue-500/20 border border-cyber-blue/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📅 Coding Since Age 13
          </div>
          <div className="bg-gradient-to-r from-cyber-green/20 to-green-500/20 border border-cyber-green/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            💻 MERN + Python
          </div>
          <div className="bg-gradient-to-r from-cyber-purple/20 to-purple-500/20 border border-cyber-purple/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📰 Featured on Dev.to, Hashnode
          </div>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            📍 Bengaluru, India
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in">
          Hi, I'm <span className="gradient-text ">Sai Likhith GB</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-in" style={{
        animationDelay: '0.2s'
      }}>
          Youngest full-stack developer in India. Building bold digital experiences using{' '}
          <span className="text-cyber-blue font-semibold">Python</span>,{' '}
          <span className="text-cyber-green font-semibold">React</span> &{' '}
          <span className="text-cyber-purple font-semibold">Node.js</span> since age 13.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in" style={{
        animationDelay: '0.4s'
      }}>
          <Button asChild size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-green hover:from-cyber-green hover:to-cyber-blue text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyber-blue/50 border border-transparent hover:border-cyber-blue/30">
            <a href="/projects">Explore My Work</a>
          </Button>
          
          <div className="flex gap-4">
            <Button asChild variant="outline" size="lg" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black transition-all duration-300 rounded-full shadow-lg hover:shadow-cyber-blue/50 hover:border-cyber-blue/50">
              <a href="https://github.com/sailikhithking" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={20} />
                GitHub
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-all duration-300 rounded-full shadow-lg hover:shadow-cyber-green/50 hover:border-cyber-green/50">
              <a href="https://www.linkedin.com/in/sai-likhith-gb-180b332a4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin size={20} />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        {/* Call to action quote */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto animate-slide-in" style={{
        animationDelay: '0.6s'
      }}>
          <p className="text-lg text-gray-300 italic">
            "Remember the name: <span className="gradient-text font-semibold">Sai Likhith GB</span> — the youngest full-stack developer building India's tech future."
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
