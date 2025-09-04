import { Navbar, Hero, Footer } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <Navbar 
        user={{
          name: 'John Doe',
          email: 'john@example.com'
        }}
      />
      <Hero
        variant="default"
        badge="New Release 2025"
        title="Build Better Products Faster"
        subtitle="With UI Best Design System"
        description="2025년 최신 트렌드를 반영한 모던 웹 애플리케이션을 위한 완벽한 UI 솔루션. 애플 스타일의 다크 테마와 Linear의 미니멀한 디자인 언어를 결합했습니다."
        primaryCTA={{
          label: '컴포넌트 보기',
          href: '/components'
        }}
        secondaryCTA={{
          label: '데모 보기',
          href: '/demo'
        }}
      />
      <Footer />
    </>
  )
}