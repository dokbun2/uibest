'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { LinearCard } from '@/components/ui/LinearCard'
import {
  Github,
  Heart,
  Mail,
  Phone,
  Plus,
  Send,
  Star,
  Trash,
  User,
  Lock,
  MapPin,
  CreditCard,
  ArrowLeft,
} from 'lucide-react'

export default function DemoPage() {
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-bg-primary to-dark-bg-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
        </div>
        
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            UI 컴포넌트 데모
          </h1>
          <p className="text-xl text-dark-text-secondary">
            애플 스타일 다크 테마 컴포넌트 쇼케이스
          </p>
        </div>

        {/* Button Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-white">Buttons</h2>
          
          <div className="space-y-8">
            {/* Button Variants */}
            <div>
              <h3 className="mb-4 text-lg text-dark-text-secondary">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="mb-4 text-lg text-dark-text-secondary">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Buttons with Icons */}
            <div>
              <h3 className="mb-4 text-lg text-dark-text-secondary">
                With Icons
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<Send className="h-4 w-4" />}>
                  Send Message
                </Button>
                <Button rightIcon={<Plus className="h-4 w-4" />}>
                  Add New
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<Github className="h-5 w-5" />}
                >
                  GitHub
                </Button>
                <Button variant="destructive" leftIcon={<Trash className="h-4 w-4" />}>
                  Delete
                </Button>
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="mb-4 text-lg text-dark-text-secondary">
                Loading State
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button isLoading>Loading</Button>
                <Button variant="secondary" isLoading>
                  Processing
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-white">Inputs</h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Basic Inputs */}
            <div className="space-y-4">
              <Input
                label="이메일"
                type="email"
                placeholder="email@example.com"
                leftIcon={<Mail className="h-5 w-5" />}
              />
              
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                helperText="최소 8자 이상 입력하세요"
              />
              
              <Input
                label="전화번호"
                type="tel"
                placeholder="010-1234-5678"
                leftIcon={<Phone className="h-5 w-5" />}
              />
            </div>

            {/* Advanced Inputs */}
            <div className="space-y-4">
              <Input
                label="검색"
                type="search"
                placeholder="검색어를 입력하세요"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClear={() => setSearchValue('')}
              />
              
              <Input
                label="사용자명"
                placeholder="사용자명"
                leftIcon={<User className="h-5 w-5" />}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClear={() => setInputValue('')}
              />
              
              <Input
                label="에러 상태"
                placeholder="잘못된 입력"
                error="올바른 이메일 형식이 아닙니다"
              />
            </div>
          </div>
        </section>

        {/* Linear Style Cards Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-white">Linear Style Cards</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* On Track Project */}
            <LinearCard
              title="Mobile App Refactor"
              description="Optimize mobile app performance and improve user experience with modern architecture patterns."
              status="onTrack"
              progress={75}
              assignees={[
                { name: 'John Doe' },
                { name: 'Jane Smith' },
                { name: 'Mike Johnson' },
                { name: 'Sarah Wilson' },
              ]}
              dueDate="Dec 24"
              tags={['Performance', 'Mobile', 'High Priority']}
              metrics={[
                { label: 'Tasks', value: '24/32', trend: 'up' },
                { label: 'Velocity', value: '87%', trend: 'up' },
              ]}
              onClick={() => console.log('Card clicked')}
            />

            {/* At Risk Project */}
            <LinearCard
              title="Design System 2.0"
              description="Complete overhaul of our design system with new components and documentation."
              status="atRisk"
              progress={45}
              assignees={[
                { name: 'Alex Chen' },
                { name: 'Emma Brown' },
              ]}
              dueDate="Dec 15"
              tags={['Design', 'Frontend', 'Documentation']}
              metrics={[
                { label: 'Components', value: '15/40', trend: 'neutral' },
                { label: 'Coverage', value: '38%', trend: 'down' },
              ]}
            />

            {/* Off Track Project */}
            <LinearCard
              title="API Migration"
              description="Migrate legacy REST APIs to GraphQL with backward compatibility."
              status="offTrack"
              progress={20}
              assignees={[
                { name: 'Tom Wilson' },
              ]}
              dueDate="Dec 10"
              tags={['Backend', 'Critical']}
              metrics={[
                { label: 'Endpoints', value: '8/45', trend: 'down' },
                { label: 'Tests', value: '124', trend: 'up' },
              ]}
            />

            {/* Pending Project */}
            <LinearCard
              title="Customer Dashboard"
              description="New analytics dashboard for enterprise customers with real-time data visualization."
              status="pending"
              assignees={[
                { name: 'Lisa Park' },
                { name: 'David Kim' },
              ]}
              tags={['Analytics', 'Enterprise', 'Q1 2025']}
            />

            {/* Glass Variant */}
            <LinearCard
              variant="glass"
              title="AI Integration"
              description="Integrate AI-powered features for automated task management and insights."
              status="onTrack"
              progress={60}
              tags={['AI', 'Innovation']}
              metrics={[
                { label: 'Models', value: '3/5' },
                { label: 'Accuracy', value: '92%' },
              ]}
            />

            {/* Elevated Variant */}
            <LinearCard
              variant="elevated"
              title="Security Audit"
              description="Comprehensive security audit and implementation of new protocols."
              status="atRisk"
              progress={30}
              assignees={[
                { name: 'Security Team' },
              ]}
              tags={['Security', 'Compliance']}
            />
          </div>
        </section>

        {/* Original Card Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-white">Original Cards</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Card */}
            <Card
              title="기본 카드"
              description="이것은 기본 카드 컴포넌트입니다. 제목과 설명을 포함할 수 있습니다."
            >
              <CardContent>
                <p className="text-dark-text-secondary">
                  추가 콘텐츠를 여기에 넣을 수 있습니다.
                </p>
              </CardContent>
            </Card>

            {/* Image Card */}
            <Card
              variant="image"
              image={{
                src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
                alt: 'Abstract Image',
              }}
              title="이미지 카드"
              description="이미지가 포함된 카드입니다."
              badge="New"
            />

            {/* Interactive Card */}
            <Card
              variant="interactive"
              title="인터랙티브 카드"
              description="클릭 가능한 카드입니다. 호버 시 효과가 나타납니다."
              onClick={() => alert('카드를 클릭했습니다!')}
            />

            {/* Elevated Card */}
            <Card
              variant="elevated"
              title="Elevated 카드"
              description="그림자 효과가 있는 카드입니다."
            >
              <CardFooter>
                <span className="text-sm text-dark-text-tertiary">
                  2024년 1월 4일
                </span>
                <Button size="sm" variant="ghost">
                  <Star className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Card with Custom Footer */}
            <Card
              title="커스텀 푸터"
              description="푸터를 커스터마이징할 수 있습니다."
              footer={
                <>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-dark-accent-red" />
                    <span className="text-sm text-dark-text-secondary">42</span>
                  </div>
                  <Button size="sm" variant="primary">
                    자세히 보기
                  </Button>
                </>
              }
            />

            {/* Full Image Card */}
            <Card
              variant="image"
              padding="none"
              image={{
                src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=400&fit=crop',
                alt: 'Gradient',
              }}
            >
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-white">
                  풀 이미지 카드
                </h3>
                <p className="text-dark-text-secondary">
                  패딩 없이 이미지가 꽉 차는 카드
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}