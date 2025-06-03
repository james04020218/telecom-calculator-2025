import { useState } from "react";
import { Search, Folder, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingOverlay from "@/components/Calculator/LoadingOverlay";

interface TemplateViewerProps {
  isLoading: boolean;
}

interface Template {
  id: string;
  title: string;
  content: string;
  category: string;
}

const templateCategories = [
  {
    id: 'initial',
    name: '초기 문의 및 연결 시도',
    color: '#6366f1',
    templates: [
      {
        id: 'T001',
        title: '최초 연결 시도 - 부재중',
        content: `[미소] 인터넷 가입 혜택 안내 드립니다!
안녕하세요, 고객님!인터넷 상담 요청 주셔서 연락드렸지만, 잠시 부재중이셔서 문자로 안내드립니다 😊지금 가입 시✅ 사은품 최대 47만원 +✅ 통신요금 결합 할인 혜택 가능해요!필요하신 정보만 간단하게 안내드릴 수 있어요.👉 편하신 상담 방법 알려주세요!
📞 통화 원하시면 시간 남겨주시고
📩 문자로 원하시면 '네' 라고만 회신주셔도 바로 상담 도와드릴게요 :)
부담 없이 편하게 연락주세요!
지금 남겨주시면 가장 빠른 혜택 안내 도와드릴게요!
감사합니다.미소 전담 상담사 김홍식 드림.`,
        category: 'initial'
      },
      {
        id: 'T002',
        title: '맞춤 요금제 비교 안내',
        content: `[미소] 😊 안녕하세요, 고객님! 미소인터넷 상담사입니다. 인터넷 가입 특별 할인과 맞춤 요금제 안내차 연락드렸는데 부재중이셔서 문자 남겨요. 📞
SK/KT/LG 꼼꼼 비교! 고객님께 딱 맞는 결합 상품으로 최대 현금 사은품 + 월 요금 대폭 절감 혜택을 찾아드립니다! 💰✨ 잠깐 상담으로 더 큰 만족을 얻으세요! 😉
편하실 때 전화주시거나, 문자로 문의하셔도 좋습니다. 빠르고 친절하게 안내드릴게요. 고객님께 기분 좋은 미소를 드리는 미소인터넷! 😊 연락 기다리겠습니다.
미소인터넷 상담사 드림 💕`,
        category: 'initial'
      }
    ]
  },
  {
    id: 'followup',
    name: '세일즈 진행 및 팔로우업',
    color: '#10b981',
    templates: [
      {
        id: 'T101',
        title: '반복 부재 시 혜택 강조',
        content: `[미소] 😊 고객님, 안녕하세요! 미소인터넷 상담사입니다.
혹시 계속 바쁘신가요? 😥 이전에 안내드렸던 인터넷 가입 특별 혜택 관련해서 다시 한번 연락드렸는데, 오늘도 연결이 어려워 문자 남깁니다. 📞
고객님께 딱 맞는 맞춤 결합 할인으로 가장 합리적인 월 요금을 설계해 드리고, 숨어있는 할인과 최대 혜택까지 꼼꼼하게 챙겨드리고 싶어요! 🎁✨ 잠시만 시간 내주시면, 고객님께 꼭 맞는 플랜을 찾아드릴 수 있습니다.
통화가 계속 어려우시면 부담 없이 문자로 궁금한 점이나 연락 편한 시간 알려주세요. 신속하고 친절하게 답변드리겠습니다. 😊
고객님 통신비에 꼭 환한 미소를 더해드릴 수 있도록, 미소인터넷이 최선을 다하겠습니다! 연락 기다릴게요.
미소인터넷 상담사 드림 💕`,
        category: 'followup'
      }
    ]
  }
];

export default function TemplateViewer({ isLoading }: TemplateViewerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyToClipboard = async (content: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedTemplate(templateId);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return <LoadingOverlay telecomType="template" />;
  }

  const filteredCategories = templateCategories.map(category => ({
    ...category,
    templates: category.templates.filter(template =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.templates.length > 0);

  return (
    <div className="calculator-frame glass-effect p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">상담원 템플릿 모음</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="템플릿 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="glass-effect p-4 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold mb-3 flex items-center" style={{ color: category.color }}>
                <Folder className="text-sm mr-2" />
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.templates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-gray-700 bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70 transition-colors cursor-pointer"
                  >
                    <h4 className="font-medium text-white mb-1">{template.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {template.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">템플릿 ID: {template.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(template.content, template.id)}
                        className="text-indigo-400 hover:text-indigo-300 text-sm h-6 px-2"
                      >
                        {copiedTemplate === template.id ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        {copiedTemplate === template.id ? '복사됨!' : '복사'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-500">
              다른 키워드로 검색해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
