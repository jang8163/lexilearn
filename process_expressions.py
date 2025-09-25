#!/usr/bin/env python3
"""
LexiLearn 표현 데이터 처리 스크립트
엑셀 파일에서 표현들을 읽어서 카테고리별, 난이도별, 단계별로 재배치
"""

import pandas as pd
import json
import os
from typing import Dict, List, Any

def read_excel_file(file_path: str) -> pd.DataFrame:
    """엑셀 파일을 읽어서 DataFrame으로 반환"""
    try:
        # 엑셀 파일 읽기
        df = pd.read_excel(file_path)
        print(f"✅ 엑셀 파일 읽기 성공: {len(df)}개 행")
        print(f"📊 컬럼 정보: {list(df.columns)}")
        return df
    except Exception as e:
        print(f"❌ 엑셀 파일 읽기 실패: {e}")
        return None

def analyze_data_structure(df: pd.DataFrame) -> None:
    """데이터 구조 분석 및 출력"""
    print("\n🔍 데이터 구조 분석:")
    print(f"총 행 수: {len(df)}")
    print(f"총 컬럼 수: {len(df.columns)}")
    
    print("\n📋 컬럼별 정보:")
    for col in df.columns:
        print(f"  - {col}: {df[col].dtype}")
        if df[col].dtype == 'object':  # 문자열 컬럼
            unique_count = df[col].nunique()
            print(f"    고유값 개수: {unique_count}")
            if unique_count <= 20:  # 고유값이 적으면 출력
                print(f"    고유값: {list(df[col].unique())}")
    
    print("\n📄 첫 5행 미리보기:")
    print(df.head())

def reorganize_expressions(df: pd.DataFrame) -> Dict[str, Any]:
    """표현들을 카테고리별, 난이도별, 단계별로 재배치"""
    
    # 카테고리 정의 (기존 구조에 맞춤)
    categories = {
        'daily': '일상대화',
        'business': '비즈니스',
        'travel': '여행',
        'academic': '학술',
        'social': '사회적 상호작용',
        'professional': '전문적 소통'
    }
    
    levels = ['beginner', 'intermediate', 'advanced']
    stages_per_level = 30
    expressions_per_stage = 10
    
    reorganized_data = {}
    
    for category_key, category_name in categories.items():
        reorganized_data[category_key] = {
            'name': category_name,
            'levels': {}
        }
        
        for level in levels:
            reorganized_data[category_key]['levels'][level] = {
                'stages': {}
            }
            
            for stage in range(1, stages_per_level + 1):
                reorganized_data[category_key]['levels'][level]['stages'][str(stage)] = {
                    'expressions': []
                }
    
    # 데이터 분배 로직
    print("\n🔄 표현 재배치 중...")
    
    # 각 행을 순회하면서 적절한 위치에 배치
    for index, row in df.iterrows():
        # 여기서는 예시로 순차적으로 배치
        # 실제로는 row의 카테고리, 난이도, 단계 정보를 사용해야 함
        
        # 현재 위치 계산 (순차 배치)
        total_expressions = len(df)
        expressions_per_category = total_expressions // len(categories)
        expressions_per_level = expressions_per_category // len(levels)
        expressions_per_stage = expressions_per_level // stages_per_level
        
        category_index = index // expressions_per_category
        level_index = (index % expressions_per_category) // expressions_per_level
        stage_index = ((index % expressions_per_category) % expressions_per_level) // expressions_per_stage
        
        category_key = list(categories.keys())[category_index % len(categories)]
        level = levels[level_index % len(levels)]
        stage = str((stage_index % stages_per_level) + 1)
        
        # 표현 데이터 구성
        expression_data = {
            'id': index + 1,
            'korean': row.get('korean', ''),
            'english': row.get('english', ''),
            'pronunciation': row.get('pronunciation', ''),
            'meaning': row.get('meaning', ''),
            'example': row.get('example', ''),
            'difficulty': row.get('difficulty', level),
            'category': row.get('category', category_name)
        }
        
        # 중괄호 제거
        for key in expression_data:
            if isinstance(expression_data[key], str):
                expression_data[key] = expression_data[key].replace('{', '').replace('}', '')
        
        # 해당 위치에 추가
        reorganized_data[category_key]['levels'][level]['stages'][stage]['expressions'].append(expression_data)
    
    return reorganized_data

def save_reorganized_data(data: Dict[str, Any], output_file: str) -> None:
    """재배치된 데이터를 JSON 파일로 저장"""
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ 재배치된 데이터 저장 완료: {output_file}")
    except Exception as e:
        print(f"❌ 데이터 저장 실패: {e}")

def generate_typescript_file(data: Dict[str, Any], output_file: str) -> None:
    """TypeScript 파일로 변환하여 저장"""
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("// LexiLearn 표현 데이터 - 자동 생성됨\n")
            f.write("// 카테고리별, 난이도별, 단계별로 재배치된 데이터\n\n")
            f.write("export interface Expression {\n")
            f.write("  id: number;\n")
            f.write("  korean: string;\n")
            f.write("  english: string;\n")
            f.write("  pronunciation: string;\n")
            f.write("  meaning: string;\n")
            f.write("  example: string;\n")
            f.write("  difficulty: string;\n")
            f.write("  category: string;\n")
            f.write("}\n\n")
            
            f.write("export interface Stage {\n")
            f.write("  expressions: Expression[];\n")
            f.write("}\n\n")
            
            f.write("export interface Level {\n")
            f.write("  stages: { [key: string]: Stage };\n")
            f.write("}\n\n")
            
            f.write("export interface Category {\n")
            f.write("  name: string;\n")
            f.write("  levels: { [key: string]: Level };\n")
            f.write("}\n\n")
            
            f.write("export const expressionsData: { [key: string]: Category } = ")
            f.write(json.dumps(data, ensure_ascii=False, indent=2))
            f.write(";\n")
        
        print(f"✅ TypeScript 파일 생성 완료: {output_file}")
    except Exception as e:
        print(f"❌ TypeScript 파일 생성 실패: {e}")

def main():
    """메인 함수"""
    print("🚀 LexiLearn 표현 데이터 처리 시작")
    
    # 엑셀 파일 경로
    excel_file = "English_Expressions_5400_Final_Clean.xlsx"
    
    if not os.path.exists(excel_file):
        print(f"❌ 엑셀 파일을 찾을 수 없습니다: {excel_file}")
        return
    
    # 1. 엑셀 파일 읽기
    df = read_excel_file(excel_file)
    if df is None:
        return
    
    # 2. 데이터 구조 분석
    analyze_data_structure(df)
    
    # 3. 표현 재배치
    reorganized_data = reorganize_expressions(df)
    
    # 4. 결과 저장
    save_reorganized_data(reorganized_data, "expressions_reorganized.json")
    generate_typescript_file(reorganized_data, "expressions_reorganized.ts")
    
    print("\n🎉 처리 완료!")
    print("📁 생성된 파일:")
    print("  - expressions_reorganized.json (JSON 형식)")
    print("  - expressions_reorganized.ts (TypeScript 형식)")

if __name__ == "__main__":
    main()
