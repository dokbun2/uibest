'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { Badge, NotificationBadge } from '@/components/ui/Badge'
import { Dropdown } from '@/components/ui/Dropdown'
import { Carousel } from '@/components/ui/Carousel'
import { Progress, CircularProgress, StepsProgress } from '@/components/ui/Progress'
import { Spinner, DotsLoading, Skeleton, LoadingOverlay } from '@/components/ui/Loading'
import { Switch } from '@/components/ui/Switch'
import { Checkbox, CheckboxGroup } from '@/components/ui/Checkbox'
import { 
  Mail, User, Lock, Phone, Bell, Settings, Home, 
  FileText, Briefcase, Calendar, ArrowLeft
} from 'lucide-react'

export default function ComponentsPage() {
  const [switch1, setSwitch1] = useState(false)
  const [switch2, setSwitch2] = useState(true)
  const [switch3, setSwitch3] = useState(false)
  const [switch4, setSwitch4] = useState(false)
  const [switch5, setSwitch5] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [checkbox2, setCheckbox2] = useState(false)
  const [checkbox3, setCheckbox3] = useState(true)
  const [checkbox4, setCheckbox4] = useState(false)
  const [checkbox5, setCheckbox5] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('')
  const [multiCheckboxValues, setMultiCheckboxValues] = useState<string[]>([])
  const [progressValue, setProgressValue] = useState(65)

  const dropdownOptions = [
    { value: 'react', label: 'React', icon: <FileText className="h-4 w-4" />, description: 'A JavaScript library' },
    { value: 'vue', label: 'Vue.js', icon: <FileText className="h-4 w-4" />, description: 'The progressive framework' },
    { value: 'angular', label: 'Angular', icon: <FileText className="h-4 w-4" />, description: 'Platform for web apps' },
    { value: 'svelte', label: 'Svelte', icon: <FileText className="h-4 w-4" />, description: 'Compile-time framework' },
  ]

  const carouselSlides = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop',
      title: 'Modern Design System',
      description: 'Beautiful dark theme components for 2025',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=600&fit=crop',
      title: 'Gradient Backgrounds',
      description: 'Stunning visual effects with glassmorphism',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=600&fit=crop',
      title: 'Professional UI/UX',
      description: 'Apple-inspired interface design',
    },
  ]

  const steps = [
    { label: 'Setup', completed: true },
    { label: 'Design', completed: true },
    { label: 'Development', current: true },
    { label: 'Testing' },
    { label: 'Deploy' },
  ]

  const checkboxOptions = [
    { value: 'notifications', label: '알림 받기', helperText: '중요한 업데이트를 이메일로 받습니다' },
    { value: 'marketing', label: '마케팅 이메일', helperText: '제품 소식과 프로모션 정보' },
    { value: 'security', label: '보안 알림', helperText: '계정 보안 관련 알림' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-zinc-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            UI Components Showcase
          </h1>
          <p className="text-xl text-zinc-400">
            2025 모던 다크 테마 컴포넌트 라이브러리
          </p>
        </div>

        {/* Avatar Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Avatar</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar size="xs" fallback="XS" />
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="JD" />
              <Avatar size="lg" fallback="LG" variant="primary" />
              <Avatar size="xl" fallback="XL" variant="success" />
              <Avatar 
                size="2xl" 
                src="https://i.pravatar.cc/150?img=1" 
                alt="User Avatar"
                status="online"
              />
            </div>
            <div className="flex items-center gap-4">
              <Avatar fallback="ON" status="online" />
              <Avatar fallback="AW" status="away" variant="warning" />
              <Avatar fallback="BS" status="busy" variant="danger" />
              <Avatar fallback="OF" status="offline" variant="secondary" />
            </div>
            <AvatarGroup max={4}>
              <Avatar fallback="A1" />
              <Avatar fallback="B2" variant="primary" />
              <Avatar fallback="C3" variant="success" />
              <Avatar fallback="D4" variant="warning" />
              <Avatar fallback="E5" variant="danger" />
              <Avatar fallback="F6" />
            </AvatarGroup>
          </div>
        </section>

        {/* Badge Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Badge</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge size="xs">Extra Small</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge dot variant="primary">With Dot</Badge>
              <Badge removable onRemove={() => console.log('Removed')}>Removable</Badge>
              <Badge variant="success" glow>Glow Effect</Badge>
              <Badge variant="danger" pulse>Pulse Animation</Badge>
            </div>
            <div className="flex items-center gap-6">
              <NotificationBadge count={5}>
                <Bell className="h-6 w-6 text-white" />
              </NotificationBadge>
              <NotificationBadge count={99} max={99}>
                <Mail className="h-6 w-6 text-white" />
              </NotificationBadge>
              <NotificationBadge dot>
                <Settings className="h-6 w-6 text-white" />
              </NotificationBadge>
            </div>
          </div>
        </section>

        {/* Dropdown Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Dropdown</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Dropdown
              label="프레임워크 선택"
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              placeholder="프레임워크를 선택하세요"
              helperText="프로젝트에 사용할 프레임워크를 선택합니다"
            />
            <Dropdown
              label="검색 가능한 드롭다운"
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
              searchable
              placeholder="검색하여 선택..."
            />
          </div>
        </section>

        {/* Carousel Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Carousel</h2>
          <div className="h-[400px]">
            <Carousel
              slides={carouselSlides}
              autoPlay
              interval={5000}
              showIndicators
              showControls
              pauseOnHover
            />
          </div>
        </section>

        {/* Progress Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Progress</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <Progress value={25} label="Basic Progress" showValue />
              <Progress value={50} variant="primary" label="Primary" showValue />
              <Progress value={75} variant="success" label="Success" showValue animated />
              <Progress value={60} variant="warning" label="Warning" showValue striped />
              <Progress value={90} variant="danger" label="Danger" showValue />
              <Progress variant="gradient" label="Gradient" value={progressValue} showValue animated />
              <Progress indeterminate variant="primary" label="Indeterminate" />
            </div>
            
            <div className="flex items-center gap-8">
              <CircularProgress value={25} size="sm" showValue />
              <CircularProgress value={50} size="md" variant="primary" showValue />
              <CircularProgress value={75} size="lg" variant="success" showValue />
              <CircularProgress value={90} size="xl" variant="danger" showValue />
              <CircularProgress indeterminate size="lg" variant="primary" />
            </div>

            <StepsProgress steps={steps} variant="numbered" />
          </div>
        </section>

        {/* Loading Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Loading</h2>
          <div className="space-y-8">
            <div className="flex items-center gap-8">
              <Spinner size="xs" />
              <Spinner size="sm" color="primary" />
              <Spinner size="md" color="success" />
              <Spinner size="lg" color="warning" />
              <Spinner size="xl" color="danger" label="Loading..." />
            </div>
            
            <div className="flex items-center gap-8">
              <DotsLoading size="sm" color="white" />
              <DotsLoading size="md" color="primary" />
              <DotsLoading size="lg" color="success" />
            </div>

            <div className="space-y-3">
              <Skeleton variant="text" />
              <Skeleton variant="title" />
              <div className="flex gap-3">
                <Skeleton variant="avatar" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </div>
              </div>
              <Skeleton variant="card" />
            </div>
          </div>
        </section>

        {/* Switch Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Switch</h2>
          <div className="space-y-6">
            <Switch
              size="sm"
              label="Small Switch"
              checked={switch1}
              onCheckedChange={setSwitch1}
            />
            <Switch
              size="md"
              label="알림 설정"
              helperText="새로운 메시지가 도착하면 알림을 받습니다"
              checked={switch2}
              onCheckedChange={setSwitch2}
            />
            <Switch
              size="lg"
              variant="success"
              label="자동 저장"
              helperText="변경사항을 자동으로 저장합니다"
              checked={switch3}
              onCheckedChange={setSwitch3}
            />
            <Switch
              variant="warning"
              label="개발자 모드"
              helperText="고급 기능을 활성화합니다"
              checked={switch4}
              onCheckedChange={setSwitch4}
            />
            <Switch
              variant="danger"
              label="데이터 삭제"
              helperText="주의: 이 작업은 되돌릴 수 없습니다"
              checked={switch5}
              onCheckedChange={setSwitch5}
            />
          </div>
        </section>

        {/* Checkbox Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-white mb-8">Checkbox</h2>
          <div className="space-y-8">
            <div className="space-y-4">
              <Checkbox
                label="기본 체크박스"
                checked={checkboxValue}
                onCheckedChange={(checked) => setCheckboxValue(checked as boolean)}
              />
              <Checkbox
                variant="success"
                label="동의합니다"
                helperText="서비스 약관에 동의합니다"
                checked={checkbox2}
                onCheckedChange={(checked) => setCheckbox2(checked as boolean)}
              />
              <Checkbox
                variant="warning"
                label="중요 알림"
                checked={checkbox3}
                onCheckedChange={(checked) => setCheckbox3(checked as boolean)}
              />
              <Checkbox
                variant="danger"
                label="비활성화 예시"
                checked={checkbox4}
                onCheckedChange={(checked) => setCheckbox4(checked as boolean)}
                disabled
              />
              <Checkbox
                label="Indeterminate 상태"
                checked={checkbox5}
                indeterminate={!checkbox5 && checkboxValue && checkbox2}
                onCheckedChange={(checked) => setCheckbox5(checked as boolean)}
              />
            </div>

            <div className="pt-4">
              <CheckboxGroup
                label="알림 설정"
                options={checkboxOptions}
                value={multiCheckboxValues}
                onChange={setMultiCheckboxValues}
                variant="default"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}